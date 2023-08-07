// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth, createUserWithEmailAndPassword, addDoc, db, collection, query, where } from '@/firebase'

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

    createUserWithEmailAndPassword(auth, email, password).then((uc: any) => {

        addDoc(collection(db, "Users"), {
          email: email,
          stocks: [],
          user_id: uc.user.reloadUserInfo.localId,
          username: uc.user.displayName
        }).then(() => {
          res.status(200).json("Account creation was a success")
        })

    }).catch((error: any) => {
        console.log('/api/auth/register ERROR:', error)
        res.status(200).json({ 'user': undefined, 'error': JSON.stringify(error) })
    })
}
