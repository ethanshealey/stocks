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

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ user, setUser ] = useState()

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/auth/checkAuth').then((res) => res.text()).then(async (data) => {
      console.log(data)
      // if(!data.user) {
      //   if(!['/login', '/register'].includes(router.pathname))
      //     router.push('/login')
      //   setIsLoading(false)
      // }
      // else {
      //   const u = JSON.parse(data.user)
      //   setUser((_: any) => u)
      //   setIsLoading(false)
      //   if(['/login', '/register'].includes(router.pathname))
      //     router.push('/')
      // }
    })
  }, [router, router.isReady])

  return (
    <>
      <Toaster position='bottom-center' />
      { isLoading ? <></> : <Component {...pageProps} user={user} /> }
    </>
  )
}


