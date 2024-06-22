import axios from 'axios';
import './AddBlog.css'
import React, { useContext, useEffect, useState } from 'react'
import { Url } from '../../constant/Url';
import { MyContext } from '../../constant/Context';
import toast from 'react-hot-toast';
import blogImg from '../../assets/blog-img.jpg'
import { useNavigate, useParams } from 'react-router-dom';

const AddBlog = () => {
   const [blog, setBlog] = useState({ title: "", description: "", category: "", image: null });
   const [imagePreview, setImagePreview] = useState(null);
   const router = useNavigate();
   console.log(blog)

   const { id } = useParams();

   const { headers } = useContext(MyContext)

   const handleChange = (event) => {
      if (event.target.name === 'image') {
         const selectedImage = event.target.files[0];
         setBlog({ ...blog, image: selectedImage });
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(reader.result);
         };
         if (selectedImage) {
            reader.readAsDataURL(selectedImage);
         } else {
            setImagePreview(null);
         }
      } else {
         setBlog({ ...blog, [event.target.name]: event.target.value });
      }
   }

   const blogForm = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('description', blog.description);
      formData.append('category', blog.category);
      formData.append('image', blog.image);

      console.log(formData)
      const editSingleBlogUrl = Url.editBlog + id

      if (id) {
         try {
            await axios.put(editSingleBlogUrl, formData, { headers })
               .then((res) => {
                  toast.success("Edited Successfully")
                  getSingleBlog();
               })
               .catch((error) => console.log(error))
         } catch (error) {
            console.log(error)
         }
      } else {
         try {
            await axios.post(Url.addBlog, formData, { headers })
               .then((res) => {
                  toast.success("Uploaded Successfully")
                  setImagePreview(null);
                  setBlog({ title: "", description: "", category: "", image: null })
               })
               .catch((error) => console.log(error))
         } catch (error) {
            console.log(error)
         }
      }
   }

   const deleteBlog = async () => {
      const deleteBlogUrl = Url.deleteBlog + id
      try {
         await axios.delete(deleteBlogUrl, { headers })
            .then((res) => {
               toast.success("Blog Deleted Successfully")
               router('/')
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   const getSingleBlog = async () => {
      const singleBlogUrl = Url.getSingleBlog + id
      try {
         await axios.get(singleBlogUrl, { headers })
            .then((res) => {
               setImagePreview(null);
               setBlog(res.data.blog)
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getSingleBlog();
   }, [])

   return (
      <div className='blogForm'>
         <form onSubmit={blogForm}>
            <div className='h-100 row'>
               <div className='p-1 col-8'>
                  <div className='bg-dark-subtle h-100 rounded p-2 pb-4'>
                     <p className='fs-4 fw-semibold text-center'>Blog Form</p>
                     <hr className='my-2' />
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
                                 <input className='form-control fs-5 fw-semibold' type="file" name='image' onChange={(handleChange)} />
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
                                 <textarea className='blogFormDes form-control fs-5 fw-semibold' type="text" name='description' value={blog?.description || ""} onChange={handleChange} />
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>

               <div className='p-1 col-4'>
                  <div className='d-flex flex-column h-100'>
                     <div className='bg-dark-subtle w-100 h-100 d-flex flex-column align-items-center rounded p-3 pb-5 mb-1'>
                        <div className='blogImageSize border rounded mt-4'>
                           {imagePreview ? (
                              <img src={imagePreview} className='w-100 h-100 rounded' alt='Preview' />
                           ) : (
                              <img src={blog.image ? `http://localhost:8000/uploads/${blog?.image}` : blogImg} className='w-100 h-100 rounded' alt='Placeholder' />
                           )}
                        </div>
                     </div>
                     <button className='btn btn-primary w-100 fs-4 fw-semibold my-1' type='submit'>Save</button>
                     <button className='btn btn-danger w-100 fs-4 fw-semibold my-1' onClick={deleteBlog}>Delete</button>
                     <button className='btn btn-secondary w-100 fs-4 fw-semibold mt-1' onClick={() => router('/')}>Cancle</button>
                  </div>
               </div>
            </div>
         </form>
      </div >
   )
}

export default AddBlog