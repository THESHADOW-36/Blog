import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './UserList.css'
import { Url } from '../../constant/Url';
import axios from 'axios';
import { MyContext } from '../../constant/Context';
import propic from '../../assets/propic1.png'
import toast from 'react-hot-toast'

const UserList = () => {
   const [users, setUsers] = useState([]);
   const [modal, setModal] = useState(false)

   const { id } = useParams();

   const router = useNavigate();

   const { headers } = useContext(MyContext)

   const getUser = async () => {
      try {
         await axios.get(Url.allUser, { headers })
            .then((res) => {
               setUsers(res.data.user)
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   const getSingleUser = async (id) => {
      try {
         const singleUserUrl = Url.singleUser + id
         await axios.get(singleUserUrl, { headers })
            .then((res) => {
               router(`/profile/${id}`)
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   const openModal = (id) => {
      setModal(true)
      router(`/user-list/${id}`)
   }

   const closeModal = () => {
      setModal(false)
      router('/user-list')
   }

   const deleteUser = async () => {
      try {
         const delUserUrl = Url.deleteUser + id
         await axios.delete(delUserUrl, { headers })
            .then((res) => {
               setModal(false)
               router('/user-list')
               toast.success(res.data.message)
               getUser();
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }


   useEffect(() => {
      getUser();
      // eslint-disable-next-line
   }, [])
   return (
      <div className='userList'>
         <div className='py-4 row'>
            {users?.map((user, index) => (
               <div className='col-3 px-4 mb-5' key={index}>
                  <div className='userListCard card p-3 d-flex flex-column align-items-center'>
                     <div className='userImg mt-3'>
                        <img className='w-100 h-100 rounded-circle' src={propic} alt="" />
                     </div>
                     <p className='fs-4 fw-semibold mt-2'>{user.firstName} {user.lastName}</p>
                     <p className='text-secondary'>{user.email}</p>
                     <p className='text-secondary mt-2'>{user.role}</p>
                  </div>
                  <div className='d-flex'>
                     <button className='btn btn-primary w-50 me-1 mt-2' onClick={() => getSingleUser(user._id)}>View</button>
                     <button className='btn btn-danger w-50 ms-1 mt-2' onClick={() => openModal(user._id)}>Delete</button>
                  </div>

                  {modal &&
                     <div className='position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-25 z-1'>
                        <div className='card bg-dark-subtle w-25 '>
                           <div className='card-header'>
                              <h5 className='card-title m-0'>Delete Alert</h5>
                           </div>
                           <div className='card-body'>
                              <p className='card-text'>Are you sure?</p>
                              <p className='card-text'>your want to delete.</p>
                           </div>
                           <div className='w-100 d-flex justify-content-end pb-3 px-3 mt-3'>
                              <button className='btn btn-secondary w-50 me-2' onClick={closeModal}>Cancel</button>
                              <button className='btn btn-danger w-50 ms-2' onClick={deleteUser}>Delete</button>
                           </div>
                        </div>
                     </div>
                  }
               </div>
            ))}
         </div>
      </div>
   )
}

export default UserList