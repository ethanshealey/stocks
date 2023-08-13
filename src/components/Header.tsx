import React, { useEffect } from 'react'
import Image from 'next/image'
import { RxHamburgerMenu } from 'react-icons/rx'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { AiOutlineStock } from 'react-icons/ai'
import { useRouter } from 'next/router';
import { auth, signOut } from '@/firebase'

const Header = () => {

    const router = useRouter()

    const toggleMenu = () => {
        const hide = () => document.getElementById('home-header-dropdown')!.style.display = 'none';
        const show = () => document.getElementById('home-header-dropdown')!.style.display = 'flex';

        const isHidden = () => document.getElementById('home-header-dropdown')!.style.display === 'none' || 
                               document.getElementById('home-header-dropdown')!.style.display.length === 0;

        isHidden() ? show() : hide()
    }

    const logout = () => {
        signOut(auth).then(() => {
            router.push('/login')
        })
    }

  return (
    <header id="home-header">
        <div id="home-header-left">
          <Image src={'/logo1.png'} width='50' height='50' alt='logo' />&nbsp;<h1>STOCKS</h1>&nbsp; <span>ethanshealey.com</span>
        </div>
        <div id="home-header-right">
            <button id="home-header-btn" onClick={toggleMenu}>
                <RxHamburgerMenu />
            </button>
            <ul id="home-header-dropdown">
                <li className='option'><AiOutlineStock /> Paper Money</li>
                <li id='logout' onClick={logout}><RiLogoutBoxLine /> Logout</li>
            </ul>
        </div>
    </header>
  )
}

export default Header