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

    const symbols: string | string[] = req.query?.symbols ?? ''
    const headers: HeadersInit = new Headers()

    headers.set( 'X-RapidAPI-Key', process.env.X_RAPIDAPI_KEY_4 || '')
    headers.set( 'X-RapidAPI-Host', process.env.X_RAPIDAPI_HOST || '')

    if(symbols?.length > 0) {
      fetch('https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=' + symbols, {
          method: "GET",
          headers: headers
      }).then((r) => r.json()).then((data) => {

          if(data?.message === 'You have exceeded the MONTHLY quota for Request on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/sparior/api/yahoo-finance15')
            res.status(500).json({ "message": "Exceeded monthly quota, please come back later :(" })
          
          const stocks: any = []
          data.body.forEach((stock: any) => {
            stocks.push({
              symbol: stock.symbol,
              longName: stock.longName,
              price: stock.regularMarketPrice,
              change: stock.regularMarketChange,
              changePercent: stock.regularMarketChangePercent
            })
          })

          return res.status(200).json(stocks)
      }).catch((err) => {
        console.log('Error in /api/stocks/quotes =>', err)
      })
    }
}
