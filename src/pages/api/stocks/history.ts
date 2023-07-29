// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    const sym = req.query.symbol
    const interval = req.query.interval

    if(sym && interval) {
        const headers: HeadersInit = new Headers()

        headers.set( 'X-RapidAPI-Key', process.env.X_RAPIDAPI_KEY || '')
        headers.set( 'X-RapidAPI-Host', process.env.X_RAPIDAPI_HOST || '')

        fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${sym}/${interval}`, {
            headers: headers
        }).then((res) => res.json()).then((data) => {
            const history: any[] = []
            for(const [k,v] of Object.entries(data.items)) {
                const val: any = v
                const tdate = new Date(val.date_utc * 1000).toString().split(':')
                tdate.pop()
                const date = `${ tdate.join(':').split(' ')[1] } ${ tdate.join(':').split(' ')[2] } ${ tdate.join(':').split(' ')[3] } ${ tdate.join(':').split(' ')[4] }`
                val['fixed_date'] = date
                val['fixed_date_MMHH'] = date.split(' ')[3]
                history.push(val)
            }
            fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${sym}/asset-profile`, {
                headers: headers
            }).then((res) => res.json()).then((data) => {
                const profile = data.assetProfile
                fetch(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${sym}`, {
                    headers: headers
                }).then((res) => res.json()).then((data) => {
                    res.status(200).json({
                        history: history,
                        profile: { ...profile, ...data[0] }
                    })
                })
            })
        })
    }
    else {
        res.status(500).json({ "error": "Missing symbol or interval" })
    }

}
