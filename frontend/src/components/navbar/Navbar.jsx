import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
   const router = useNavigate();
   return (
      <div className='navbarLay'>
         <div className='navbar'>
            <div className='logo'>Blog</div>
            <div className='navContent'>
               <div onClick={() => router('/')}>Home</div>
               <div onClick={() => router('/add-blog')}>Add Blog</div>
               <div onClick={() => router('/bookmark')}>Bookmark</div>
               <div onClick={() => router('/user-list')}>Userlist</div>
               <div onClick={() => router('/profile')}>Profile</div>
            </div>
            <div className='logout' onClick={() => router('/login')}><i class="fa-solid fa-right-from-bracket fa-lg me-3"></i></div>
         </div>
      </div>
   )
}

export default Navbar