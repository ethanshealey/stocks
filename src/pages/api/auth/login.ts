// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth, signInWithEmailAndPassword, getDocs, db, collection, query, where } from '@/firebase'

type ResponseData = {
  user: string | undefined
  error: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const email = req.body.email
    const password = req.body.password

    signInWithEmailAndPassword(auth, email, password).then((uc) => {
        const user = uc.user

        const q = query(collection(db, "Users"), where("email", "==", user.email))

        getDocs(q).then((qs) => {
          const u = qs.docs[0].data()
          res.status(200).json({ 'user': JSON.stringify({ ...u, "extra": user }), 'error': '' })
        })
    }).catch((error: any) => {
        console.log(error)
        res.status(200).json({ 'user': undefined, 'error': JSON.stringify(error) })
    })
}
