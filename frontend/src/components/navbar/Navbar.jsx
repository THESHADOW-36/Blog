import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../constant/Context';

const Navbar = () => {
   const router = useNavigate();

   const { currentUser } = useContext(MyContext)

   const [menuBar, setMenuBar] = useState(false);

   const logout = () => {
      localStorage.removeItem("UserToken")
      router('/login')
      window.location.reload();  
   }

   return (
      <div className='navbarLay'>
         <div className='navbar'>
            <div className='logo'>Blog</div>
            <div className='d-none d-sm-flex'>
               <div className='navContent'>
                  {currentUser ?
                     <>
                        <div onClick={() => router('/')}>Home</div>

                        {currentUser?.role === "Admin" && <div onClick={() => router('/add-blog')}>Add Blog</div>}

                        <div onClick={() => router('/bookmark')}>Bookmark</div>

                        {currentUser?.role === "Admin" && <div onClick={() => router('/user-list')}>Userlist</div>}

                        <div onClick={() => router('/profile')}>Profile</div>

                        <div className='logout' onClick={logout}><i class="fa-solid fa-right-from-bracket fa-lg me-3"></i></div>
                     </>
                     :
                     <div onClick={logout}>Sign In</div>
                  }
               </div>
            </div>

            <div className='position-relative d-block d-sm-none'>
               <div onClick={() => setMenuBar(!menuBar)} style={{ cursor: "pointer" }} ><i class="fa-solid fa-bars fa-xl"></i></div>
               {menuBar &&
                  <div className='menuBar'>
                     <div onClick={() => router('/')}>Home</div>

                     {currentUser?.role === "Admin" && <div onClick={() => router('/add-blog')}>Add Blog</div>}

                     <div onClick={() => router('/bookmark')}>Bookmark</div>

                     {currentUser?.role === "Admin" && <div onClick={() => router('/user-list')}>Userlist</div>}

                     <div onClick={() => router('/profile')}>Profile</div>

                     <div onClick={logout}>Logout</div>
                  </div>
               }
            </div>
         </div >
      </div >
   )
}

export default Navbar