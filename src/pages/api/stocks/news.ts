// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use client'
import sleep from '@/helpers/sleep'
import type { NextApiRequest, NextApiResponse } from 'next'
const urlMetaData = require('url-metadata')

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    const symbols: string | string[] | undefined = req.query?.symbols
    const headers: HeadersInit = new Headers()

    headers.set( 'X-RapidAPI-Key', process.env.X_RAPIDAPI_KEY_5 || '')
    headers.set( 'X-RapidAPI-Host', process.env.X_RAPIDAPI_HOST || '')

    fetch('https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news', {
        method: "GET",
        headers: headers
    }).then((r) => r.json()).then(async (data) => {
        const newsItems: any[] = []

        // data.forEach((newsItem: any) => {
        //     urlMetaData(newsItem.link).then((metadata: any) => {
        //         newsItems.push({
        //             image: metadata.image,
        //             title: newsItem.title,
        //             date: newsItem.pubDate,
        //             link: newsItem.link,
        //             source: newsItem.source,
        //             guid: newsItem.guid
        //         })
        //     }, (error: any) => {
        //         console.error('failed to find image...')
        //         newsItems.push({
        //             image: 'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png',
        //             title: newsItem.title,
        //             date: newsItem.pubDate,
        //             link: newsItem.link,
        //             source: newsItem.source,
        //             guid: newsItem.guid
        //         })
        //     })
        // })

        for(let i = 0; i < data.length; i++) {
            urlMetaData(data[i].link).then((metadata: any) => {
                newsItems.push({
                    image: metadata.image === '' ? 'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png' : metadata.image,
                    title: data[i].title,
                    date: data[i].pubDate,
                    link: data[i].link,
                    source: data[i].source,
                    guid: data[i].guid
                })
            }, (error: any) => {
                newsItems.push({
                    image: 'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png',
                    title: data[i].title,
                    date: data[i].pubDate,
                    link: data[i].link,
                    source: data[i].source,
                    guid: data[i].guid
                })
            })
        }

        while(newsItems.length < data.length) 
            await sleep(10)

        res.status(200).json(newsItems)
    })

    //res.status(200).json({ symbols: symbolList })
}
