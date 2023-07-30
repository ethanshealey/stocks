'use client'
import { auth } from '@/firebase';
import '@/styles/globals.scss'
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ user, setUser ] = useState()

  useEffect(() => {
    fetch('/api/auth/checkAuth').then((res) => res.json()).then((data) => {
      if(!data.user) {
        if(!['/login', '/register'].includes(router.pathname))
          router.push('/login')
      }
      else {
        const u = JSON.parse(data.user)
        setUser((_: any) => u)
        if(['/login', '/register'].includes(router.pathname))
          router.push('/')
      }
    })
  }, [])

  return (
    <>
      <Toaster position='bottom-center' />
      <Component {...pageProps} user={user} />
    </>
  )
}
