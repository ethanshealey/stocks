// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth, signOut } from '@/firebase'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    signOut(auth).then(() => {
        res.status(200).json({ "message": "signed out successfully" })
    })
}
