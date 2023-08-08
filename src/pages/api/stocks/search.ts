// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, doc, getDocs, where, query, collection, deleteDoc, addDoc } from '@/firebase'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    const q: any = req.query.query

    if(q) {
      const headers: HeadersInit = new Headers()

      headers.set( 'X-RapidAPI-Key', process.env.X_RAPIDAPI_KEY_2 || '')
      headers.set( 'X-RapidAPI-Host', process.env.X_RAPIDAPI_HOST_ALPHA || '')

      getDocs(query(collection(db, "Search"), where("query", "==", q.toLowerCase()))).then((results) => {
        // IF the query has been saved in db and isnt expired, serve the saved results
        if(results.docs.length) { 
          const addedDate = new Date(results.docs[0].data().date).getTime()
          const currDate = new Date().getTime()

          const monthInMilliseconds = 2_629_746_000

          console.log(currDate - addedDate)
          if(currDate - addedDate >= monthInMilliseconds) {
            // Query is expired...
            console.log('older then a month')
            // Delete from DB
            deleteDoc(doc(db, "Search", results.docs[0].id))
          }
          else {
            // Query is valid
            console.log('well im here...')
            return res.status(200).json({ "results": results.docs[0].data().results })
          }
        }

        // Search via API and store results
        fetch(`https://alpha-vantage.p.rapidapi.com/query?function=SYMBOL_SEARCH&keywords=${q}&datatype=json`, {
          method: 'GET',
          headers: headers
        }).then((res) => res.json()).then((data) => {
          const symbolList: string[] = []
          for(let i = 0; i < data.bestMatches.length; i++) {
            symbolList.push(data.bestMatches[i]['1. symbol'])
          }
          const cleanSymbolList = symbolList.filter((sym) => !sym.includes('.')).join(',')

          addDoc(collection(db, "Search"), {
            date: new Date(),
            results: cleanSymbolList,
            query: q.toLowerCase()
          })

          res.status(200).json({ "results": cleanSymbolList})
        })

        
      })
    }
    else {
        res.status(400).json({ "error": "no query given"})
    }

}
