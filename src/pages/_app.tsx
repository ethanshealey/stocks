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
import { auth, onAuthStateChanged } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const [ isLoading, setIsLoading ] = useState(false)
  const [ user, setUser ] = useState<any>()

  // useEffect(() => {
  //   setIsLoading(true)
  //   fetch('/api/auth/checkAuth').then((res) => res.text()).then(async (txt) => {
  //     try {
  //       const data = JSON.parse(txt)
  //       if(!data.user) {
  //         if(!['/login', '/register'].includes(router.pathname))
  //           router.push('/login')
  //         setIsLoading(false)
  //       }
  //       else {
  //         const u = JSON.parse(data.user)
  //         setUser((_: any) => u)
  //         setIsLoading(false)
  //         if(['/login', '/register'].includes(router.pathname))
  //           router.push('/')
  //       }
  //     }
  //     catch(e) {
  //       console.log(e)
  //     }
  //   })
  // }, [router, router.isReady])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
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


