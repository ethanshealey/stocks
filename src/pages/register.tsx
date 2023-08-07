'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
const Login = () => {

  const router = useRouter()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const register = () => {

    if(password !== confirmPassword) {
        toast.error('Passwords do not match!',
          {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
    }

    setIsLoading(true)
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "email": email, "password": password })
    }).then((res) => res.json()).then((data) => {
      if(data === "Account creation was a success") {
        toast.success('Account Creation Successfull!',
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
      setIsLoading(false)
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

        <div className='form__group field'>
          <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='form__field' placeholder='Password' required />
          <label className='form__label'>Confirm Password</label>
        </div>

        <button className='login-button' onClick={() => register()}>Register</button>

        <p>Already have an account?<br /><a href='/login'>Log In!</a></p>

      </div>
    </div>
  )
}

export default Login