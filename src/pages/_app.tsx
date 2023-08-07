'use client'
import '@/styles/globals.scss'
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

      try {
        const json = JSON.parse(data)
        console.log(json)
      }
      catch(e) {
        console.log(e)
      }

      setIsLoading(false)

      // if(!data.user) {
      //   if(!['/login', '/register'].includes(router.pathname))
      //     router.push('/login')
      //   setIsLoading(false)
      // }
      // else {
      //   const u = JSON.parse(data.user)
      //   console.log('user:', u)
      //   setUser((_: any) => u)
      //   setIsLoading(false)
      //   if(['/login', '/register'].includes(router.pathname))
      //     router.push('/')
      // }
    })
  }, [router])

  return (
    <>
      <Toaster position='bottom-center' />
      { isLoading ? <></> : <Component {...pageProps} user={user} /> }
    </>
  )
}
