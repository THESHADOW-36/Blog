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
               <div onClick={()=>router('/')}>Home</div>
               <div onClick={()=>router('/bookmark')}>Bookmark</div>
               <div onClick={()=>router('/userlist')}>Userlist</div>
               <div onClick={()=>router('/login')}>Logout</div>
            </div>
         </div>
      </div>
   )
}

export default Navbar