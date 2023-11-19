'use client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {

    const headers: HeadersInit = new Headers()

    headers.set( 'X-RapidAPI-Key', process.env.X_RAPIDAPI_KEY_3 || '')
    headers.set( 'X-RapidAPI-Host', process.env.X_RAPIDAPI_HOST || '')

    const sym = req.query.symbol

    fetch(`https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules?ticker=${sym}&module=asset-profile`, {
        headers: headers
    }).then((res) => res.json()).then((data) => {
        const profile = data.body
        fetch(`https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${sym}`, {
            headers: headers
        }).then((res) => res.json()).then((data) => {
            res.status(200).json({
                profile: { ...profile, ...data.body[0] }
            })
        })
    })

}