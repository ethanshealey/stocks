// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use client'
import type { NextApiRequest, NextApiResponse } from 'next'

// type ResponseData = {
//   symbols: string,
//   longName: string,
//   price: number,
//   change: number,
//   changePercent: number
// }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    const symbols: string | string[] | undefined = req.query?.symbols
    const headers: HeadersInit = new Headers()

    headers.set( 'X-RapidAPI-Key', process.env.X_RAPIDAPI_KEY || '')
    headers.set( 'X-RapidAPI-Host', process.env.X_RAPIDAPI_HOST || '')

    fetch('https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/' + symbols, {
        method: "GET",
        headers: headers
    }).then((r) => r.json()).then((data) => {
        const stocks: any = []
        data.forEach((stock: any) => {
          stocks.push({
            symbol: stock.symbol,
            longName: stock.longName,
            price: stock.regularMarketPrice,
            change: stock.regularMarketChange,
            changePercent: stock.regularMarketChangePercent
          })
        })
        res.status(200).json(stocks)
    }).catch((err) => {
      console.log('Error in /api/stocks/quotes =>', err)
    })

    //res.status(200).json({ symbols: symbolList })
}
