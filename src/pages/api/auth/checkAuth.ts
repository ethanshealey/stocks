// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth, onAuthStateChanged, getDocs, db, collection, query, where } from '@/firebase'

type ResponseData = {
  user: string | undefined
  error: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    // const user = auth.currentUser

    // console.log('Is there a user?')

    // console.log(user)

    // if(user) {
    //   const q = query(collection(db, "Users"), where("email", "==", user.email))
    //   getDocs(q).then((qs) => {
    //     const u = qs.docs[0].data()
    //     res.status(200).json({ 'user': JSON.stringify({ ...u, "extra": user }), 'error': '' })
    //   })
    // }
    // else {
    //   res.status(200).json({ "user": undefined, "error": "No user signed in"})
    // }

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      console.log(user)

      if(user) {
        const q = query(collection(db, "Users"), where("email", "==", user.email))
        getDocs(q).then((qs) => {
          const u = qs.docs[0].data()
          console.log('hmmm')
          res.status(200).json({ 'user': JSON.stringify({ ...u, "extra": user }), 'error': '' })
        })
      }
      else {
        res.status(200).json({ "user": undefined, "error": "No user signed in"})
      }
    })

    unsubscribe()

}
