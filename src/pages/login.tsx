'use client'
import { use, useState } from 'react'
import Image from 'next/image'
import usePersistentState from '@/hooks/usePersistentState'
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
const Login = () => {

  const router = useRouter()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const [ user, setUser ] = usePersistentState('user', undefined)

  const login = () => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "email": email, "password": password })
    }).then((res) => res.json()).then((data) => {
      if(data.user) {
        setUser((_: any) => data.user)
        toast.success('Logged In Successfully!',
          {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        router.push('/')
      }
      else
        console.log(JSON.parse(data.error))
    }).catch((e) => {
      console.log(e)
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

      </div>
    </div>
  )
}

export default Login