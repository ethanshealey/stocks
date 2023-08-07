// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, getDocs, db, collection, query, where } from '@/firebase'

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

    setPersistence(auth, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password).then((uc) => {
        res.status(200).json("Login was a success")
      }).catch((error: any) => {
          console.log('/api/auth/login ERROR:', error)
          res.status(200).json({ 'user': undefined, 'error': JSON.stringify(error) })
      })
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    })
}
