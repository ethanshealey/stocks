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

        headers.set( 'X-RapidAPI-Key', process.env.X_RAPIDAPI_KEY || '')
        headers.set( 'X-RapidAPI-Host', process.env.X_RAPIDAPI_HOST_ALPHA || '')

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
    }
    else {
        res.status(201).json({ "results": "" })
    }

}
