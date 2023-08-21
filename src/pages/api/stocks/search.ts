// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, doc, getDocs, where, query, collection, deleteDoc, addDoc } from '@/firebase'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    const q: any = req.query.query
    console.log(q)

    if(q) {
      const headers: HeadersInit = new Headers()

      headers.set( 'X-RapidAPI-Key', process.env.X_RAPIDAPI_KEY || '')
      headers.set( 'X-RapidAPI-Host', process.env.X_RAPIDAPI_HOST || '')

      fetch('')

    }
    else {
      res.status(400).json({ error: 'no query given' })
    }


}
