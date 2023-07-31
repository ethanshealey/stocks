// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth, signInWithEmailAndPassword, getDocs, db, collection, query, where } from '@/firebase'

type ResponseData = {
  user: string | undefined
  error: string | null
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const email = req.body.email
    const password = req.body.password

    signInWithEmailAndPassword(auth, email, password).then((uc) => {
        res.status(200).json("Login was a success")
    }).catch((error: any) => {
        console.log(error)
        res.status(200).json({ 'user': undefined, 'error': JSON.stringify(error) })
    })
}
