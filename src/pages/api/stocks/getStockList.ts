// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth, db, getDocs, where, query, collection } from '@/firebase'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    const uid: string | undefined = auth.currentUser?.uid;

    getDocs(query(collection(db, "Users"), where("user_id", "==", uid))).then((user) => {
        const stocks = user.docs[0].data().stocks
        res.status(200).json({ stocks: stocks })
    })

}
