import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Url } from '../../constant/Url';
import { MyContext } from '../../constant/Context';

const AddBlog = () => {
   const [blog, setBlog] = useState({ title: "", description: "", category: "", image: "" });
   console.log(blog)

   const { headers } = useContext(MyContext)

   const handleChange = (event) => {
      setBlog({ ...blog, [event.target.name]: event.target.value })
   }

   const addBlog = async (event) => {
      event.preventDefault();
      try {
         await axios.post(Url.addBlog, blog, { headers })
            .then((res) => {
               setBlog(res.data.blog)
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className='p-1 col-9'>
         <div className='bg-dark-subtle h-100 rounded p-2'>
            <p className='fs-4 fw-semibold text-center'>Add Blog</p>
            <hr className='my-2' />
            <form onSubmit={addBlog}>
               <div className='row mt-1 ps-3'>

                  <div className='col-12 d-flex mt-4 mb-2'>
                     <div className='w-100 row align-items-center'>
                        <div className='col-2 p-0'>
                           <label className='fs-5 fw-semibold'>Title</label>
                        </div>
                        <div className='col-1 fs-5 fw-semibold'>:</div>
                        <div className='col-8 p-0 '>
                           <input className='form-control fs-5 fw-semibold' type="text" name='title' value={blog?.title || ""} onChange={handleChange} />
                        </div>
                     </div>
                  </div>

                  <div className='col-12 d-flex mt-4 mb-2'>
                     <div className='w-100 row align-items-center'>
                        <div className='col-2 p-0'>
                           <label className='fs-5 fw-semibold'>Category</label>
                        </div>
                        <div className='col-1 fs-5 fw-semibold'>:</div>
                        <div className='col-8 p-0 '>
                           <input className='form-control fs-5 fw-semibold' type="text" name='category' value={blog?.category || ""} onChange={handleChange} />
                        </div>
                     </div>
                  </div>

                  <div className='col-12 d-flex mt-4 mb-2'>
                     <div className='w-100 row align-items-center'>
                        <div className='col-2 p-0'>
                           <label className='fs-5 fw-semibold'>Image</label>
                        </div>
                        <div className='col-1 fs-5 fw-semibold'>:</div>
                        <div className='col-8 p-0 '>
                           <input className='form-control fs-5 fw-semibold' type="file" name='image' value={blog?.image || ""} onChange={handleChange} />
                        </div>
                     </div>
                  </div>

                  <div className='col-12 d-flex mt-4 mb-2'>
                     <div className='w-100 row align-items-center'>
                        <div className='col-2 p-0'>
                           <label className='fs-5 fw-semibold'>Description</label>
                        </div>
                        <div className='col-1 fs-5 fw-semibold'>:</div>
                        <div className='col-8 p-0 '>
                           <textarea className='form-control fs-5 fw-semibold' type="text" name='description' value={blog?.description || ""} onChange={handleChange} />
                        </div>
                     </div>
                  </div>

               </div>

               <hr className='mt-4 mb-3' />

               <div className='mt-3 mb-2 d-flex justify-content-between px-4'>
                  <button className='btn btn-secondary px-5'>Cancel</button>
                  <button className='btn btn-primary px-5' type='submit'>Save</button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default AddBlog