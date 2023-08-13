'use client'
import '@/styles/globals.scss'
import '@/styles/login.scss'
import '@/styles/home.scss'
import '@/styles/mobile.scss'
import '@/styles/spinner.scss'
import '@/styles/news.scss'
import '@/styles/quote.scss'
import '@/styles/forms.scss'
import '@/styles/stock.scss'
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast'
import Spinner from '@/components/Spinner'
import { auth, collection, getDocs, onAuthStateChanged, query, where, db } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const [ isLoading, setIsLoading ] = useState(false)
  const [ user, setUser ] = useState<any>()

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if(u) {
        const q = query(collection(db, "Users"), where("email", "==", u.email))
        getDocs(q).then((qs) => {
          const _u = qs.docs[0].data()
          setUser(_u)
        })
      }
      else {
        console.log('no user signed in')
        router.push('/login')
      }
      setUser(u)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Toaster position='bottom-center' />
      { isLoading ? <div className='center'><Spinner /></div> : <Component {...pageProps} user={user} /> }
    </>
  )
}


