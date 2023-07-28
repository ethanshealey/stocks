// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
'use client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { arrayRemove, auth, db, doc, updateDoc, getDocs, where, query, collection } from '@/firebase'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    const uid: string | undefined = auth.currentUser?.uid;

    getDocs(query(collection(db, "Users"), where("user_id", "==", uid))).then((user) => {
        const id = user.docs[0].id
        const symbol: string = String(req.query.stock);

        if(id) {
            updateDoc(doc(db, "Users", id), {
                stocks: arrayRemove(symbol)
            })
        }

        res.status(200).json({ message: `${symbol} has been removed` })
    })

}
