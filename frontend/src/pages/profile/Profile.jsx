import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import axios from 'axios';
import { Url } from '../../constant/Url';
import { MyContext } from '../../constant/Context';
import DateFormat from '../../components/utils/DateFormat';
import propic from '../../assets/propic1.png'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom';

const Profile = () => {
   const [userData, setUserData] = useState({ firstName: "", lastName: "", dob: "", phone: "", email: "", password: "", role: "" });
   const [editBtn, setEditBtn] = useState(true)
   const { id } = useParams();
   const { headers, currentUser } = useContext(MyContext)

   const handleChange = (event) => {

      if (event.target.name === "phone" && event.target.value.length > 10) {
         return console.log("Upto 10 digits")
      }

      setUserData({ ...userData, [event.target.name]: event.target.value })
   }


   const getUserData = async () => {
      try {
         let profileUser;
         if (id) {
            profileUser = Url.singleUser + id
         } else {
            profileUser = Url.currentUser
         }

         await axios.get(profileUser, { headers })
            .then((res) => {
               setUserData(res.data.user)
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   const editUserData = async (event) => {
      event.preventDefault();
      try {
         let editProfileUser;
         if (id) {
            editProfileUser = Url.editSingleUser + id
         } else {
            editProfileUser = Url.editCurrentUser
         }
         await axios.put(editProfileUser, userData, { headers })
            .then((res) => {
               setUserData(res.data.user)
               toast.success(res.data.message)
               setEditBtn(true)
               getUserData()
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getUserData()
      // eslint-disable-next-line
   }, [])

   return (
      <div className='profile'>
         <div className='h-100 row'>

            <div className='p-1 col-3'>
               <div className='bg-dark-subtle w-100 h-100 d-flex flex-column align-items-center rounded p-3 pb-5 mb-1'>
                  <div className='proPic rounded-circle mt-5'>
                     <img src={propic} className='w-100 h-100 rounded-circle' alt='' />
                  </div>

                  <p className='fs-4 fw-semibold mt-3'>{userData?.firstName} {userData?.lastName}</p>
                  <p className='fs-6 fw-semibold text-dark-emphasis'>{userData?.email}</p>
               </div>
            </div>

            <div className='p-1 col-9'>
               <div className='bg-dark-subtle h-100 rounded p-2'>
                  <p className='fs-4 fw-semibold text-center'>Profile</p>

                  <hr className='my-2' />

                  <form onSubmit={editUserData}>
                     <div className='row mt-3'>

                        <div className='col-6 d-flex mt-4 mb-2'>
                           <div className='w-100 row align-items-center'>
                              <div className='col-4 p-0'>
                                 <label className='fs-5 fw-semibold'>First Name</label>
                              </div>
                              <div className='col-1 fs-5 fw-semibold'>:</div>
                              <div className='col-7 p-0 '>
                                 <input className='form-control fs-5 fw-semibold' type="text" name='firstName' value={userData?.firstName || ""} onChange={handleChange} disabled={editBtn} />
                              </div>
                           </div>
                        </div>

                        <div className='col-6 d-flex mt-4 mb-2'>
                           <div className='w-100 row align-items-center'>
                              <div className='col-4 p-0'>
                                 <label className='fs-5 fw-semibold'>Last Name</label>
                              </div>
                              <div className='col-1 fs-5 fw-semibold'>:</div>
                              <div className='col-7 p-0 '>
                                 <input className='form-control fs-5 fw-semibold' type="text" name='lastName' value={userData?.lastName || ""} onChange={handleChange} disabled={editBtn} />
                              </div>
                           </div>
                        </div>

                        <div className='col-6 d-flex mt-4 mb-2'>
                           <div className='w-100 row align-items-center'>
                              <div className='col-4 p-0'>
                                 <label className='fs-5 fw-semibold'>Phone Number</label>
                              </div>
                              <div className='col-1 fs-5 fw-semibold'>:</div>
                              <div className='col-7 p-0 '>
                                 <input className='form-control fs-5 fw-semibold' type="number" name='phone' value={userData?.phone || ""} onChange={handleChange} disabled={editBtn} />
                              </div>
                           </div>
                        </div>

                        <div className='col-6 d-flex mt-4 mb-2'>
                           <div className='w-100 row align-items-center'>
                              <div className='col-4 p-0'>
                                 <label className='fs-5 fw-semibold'>Date of Birth</label>
                              </div>
                              <div className='col-1 fs-5 fw-semibold'>:</div>
                              <div className='col-7 p-0 '>
                                 <input className='form-control fs-5 fw-semibold' type="date" name='dob' value={userData?.dob && (DateFormat(userData?.dob))} onChange={handleChange} disabled={editBtn} />
                              </div>
                           </div>
                        </div>

                        <div className='col-6 d-flex mt-4 mb-2'>
                           <div className='w-100 row align-items-center'>
                              <div className='col-4 p-0'>
                                 <label className='fs-5 fw-semibold'>Email ID</label>
                              </div>
                              <div className='col-1 fs-5 fw-semibold'>:</div>
                              <div className='col-7 p-0 '>
                                 <input className='form-control fs-5 fw-semibold' type="email" name='email' value={userData?.email || ""} onChange={handleChange} disabled={editBtn} />
                              </div>
                           </div>
                        </div>

                        <div className='col-6 d-flex mt-4 mb-2'>
                           <div className='w-100 row align-items-center'>
                              <div className='col-4 p-0'>
                                 <label className='fs-5 fw-semibold'>Role</label>
                              </div>
                              <div className='col-1 fs-5 fw-semibold'>:</div>
                              <div className='col-7 p-0 '>
                                 {/* <input className='form-control fs-5 fw-semibold' type="text" name='role' value={userData.role} || "" onChange={handleChange} disabled={editBtn} /> */}
                                 <select name="role" className='form-select fs-5 fw-semibold' value={userData?.role || ""} onChange={handleChange} disabled={currentUser?.role === "Admin" ? editBtn : true}>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                 </select>
                              </div>
                           </div>
                        </div>

                        <div className='col-6 d-flex mt-4 mb-2'>
                           <div className='w-100 row align-items-center'>
                              <div className='col-4 p-0'>
                                 <label className='fs-5 fw-semibold'>Password</label>
                              </div>
                              <div className='col-1 fs-5 fw-semibold'>:</div>
                              <div className='col-7 p-0 '>
                                 <input className='form-control fs-5 fw-semibold' type="password" name='password' value={userData?.password || ""} onChange={handleChange} disabled={editBtn} />
                              </div>
                           </div>
                        </div>

                     </div>

                     <hr className='mt-4 mb-3' />

                     <div className='mt-3 mb-2 d-flex justify-content-between px-4'>
                        <button className='btn btn-primary px-5' type='button' onClick={() => setEditBtn(!editBtn)}>Edit</button>
                        <button className='btn btn-primary px-5' type='submit' disabled={editBtn}>Save</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Profile