'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { auth, signInWithEmailAndPassword } from '@/firebase';
const Login = () => {

  const router = useRouter()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      router.push('/')
    })
  }

  return (
    <div id='login-wrapper'>
      <div id='login'>
        <Image src={'/logo1.png'} width='100' height='100' alt='logo' />
        <h1><b>STOCKS</b></h1>
        <p><i>brought to you by ethanshealey.com</i></p>
        
        <div className='form__group field'>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form__field' placeholder='Email' required />
          <label className='form__label'>Email</label>
        </div>

        <div className='form__group field'>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form__field' placeholder='Password' required />
          <label className='form__label'>Password</label>
        </div>

        <button className='login-button' onClick={() => login()}>Log In</button>

        <p>Don't have an account?<br /><a href='/register'>Create one!</a></p>

      </div>
    </div>
  )
}

export default Login