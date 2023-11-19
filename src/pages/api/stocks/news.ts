// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use client'
import sleep from '@/helpers/sleep'
import type { NextApiRequest, NextApiResponse } from 'next'
const urlMetaData = require('url-metadata')

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const headers: HeadersInit = new Headers()

    headers.set( 'X-RapidAPI-Key', process.env.X_RAPIDAPI_KEY_2 || '')
    headers.set( 'X-RapidAPI-Host', process.env.X_RAPIDAPI_HOST || '')

    fetch('https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news', {
        method: "GET",
        headers: headers
    }).then((r) => r.json()).then(async (data) => {
        const newsItems: any[] = []

        data = data.body

        for(let i = 0; i < 10; i++) {
            const metadata = await urlMetaData(data[i].link)
            let currentNewsItem: any = {}
            if(metadata) {
                currentNewsItem['image'] = metadata.image
            }
            else {
                currentNewsItem['image'] = 'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png'
            }
            currentNewsItem['title'] = data[i].title,
            currentNewsItem['date'] = data[i].pubDate,
            currentNewsItem['link'] = data[i].link,
            currentNewsItem['source'] = data[i].source,
            currentNewsItem['guid'] = data[i].guid

            newsItems.push(currentNewsItem)
        }

        while(newsItems.length < 10) 
            await sleep(10)

        res.status(200).json(newsItems)
    }) 
}
