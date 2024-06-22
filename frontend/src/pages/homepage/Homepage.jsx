import React, { useContext, useEffect, useState } from 'react'
import './Homepage.css'
import blogImg from './../../assets/web_app1.jpg'
import Footer from '../../components/footer/Footer'
import axios from 'axios'
import { Url } from '../../constant/Url';
import { MyContext } from '../../constant/Context'
import DateFormat from '../../components/utils/DateFormat'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Blog = () => {
   const [blog, setBlog] = useState([]);
   const [bookmark, setBookmark] = useState([]);

   const router = useNavigate();

   const { headers } = useContext(MyContext)

   const getBlogContent = async () => {
      try {
         await axios.get(Url.getBlog, { headers })
            .then((res) => {
               setBlog(res.data.blog)
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   const getBookmark = async () => {
      try {
         await axios.get(Url.getBookmark, { headers })
            .then((res) => {
               setBookmark(res.data.bookmarks)
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   const addBookmark = async (id) => {
      try {
         const blogId = id;
         await axios.post(Url.addBookmark, { blogId }, { headers })
            .then((res) => {
               getBlogContent();
               getBookmark();
               toast.success("Added to Bookmark")
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   const removeBookmark = async (id) => {
      try {
         const blogId = id;
         await axios.put(Url.removeBookmark, { blogId }, { headers })
            .then((res) => {
               getBlogContent();
               getBookmark();
               toast.success("Removed from Bookmark")
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   const columnOrders = [[3, 4, 5], [5, 4, 3]];


   useEffect(() => {
      getBlogContent();
      getBookmark();
      // eslint-disable-next-line
   }, [])
   return (
      <div className='homepage'>
         <div className='w-100 vh-100'>
            <img className='w-75 h-100' src={blogImg} alt="" />
            <div className='homeContentLay'>
               <div className='w-50 p-3 mt-5'>
                  <div className='d-flex align-items-center justify-content-between mb-4' >
                     <p className='fs-5 fw-bold'><i className="fa-regular fa-circle-user fa-lg me-2"></i>{blog[0]?.createdBy?.firstName} {blog[0]?.createdBy?.lastName}</p>
                     {blog[0] &&
                        <p className='fw-bold'><i className="fa-regular fa-calendar fa-lg me-2"></i>{DateFormat(blog[0]?.createdAt)}</p>
                     }
                  </div>
                  <p className='fs-1 fw-bold'>{blog[0]?.title}</p>
                  <p className='homeContentDescription mt-4'>{blog[0]?.description}</p>
               </div>
            </div>
         </div>

         <div className='p-4'>
            <p className='fs-3 fw-bolder mb-4'>Blog</p>
            <div className='row'>
               {blog?.map((data, index) => {
                  const rowIndex = Math.floor(index / 3);
                  const colIndex = index % 3;
                  const colOrder = columnOrders[rowIndex % columnOrders.length];
                  return (
                     <div className={`col-${colOrder[colIndex]} mb-4`} key={index}>
                        <div className='card'>
                           <div className='blogImgEdit position-relative'>
                              <img className='blogImg card-img-top object-fit-cover' src={`http://localhost:8000/uploads/${data.image}`} alt="" />
                              <div className='position-absolute bottom-0 start-0 text-white' onClick={() => router(`/edit-blog/${data._id}`)}>
                                 <i class="fa-solid fa-pen-to-square"></i><p>Edit</p>
                              </div>
                           </div>
                           <div className='blogInfo card-body d-flex flex-column justify-content-between'>
                              <div>
                                 <div className='d-flex align-items-center justify-content-between mb-2'>
                                    <h5 className='blogTitle card-title'>{data.title}</h5>
                                    {bookmark?.find(bookmark => bookmark._id === data._id) ?
                                       <i className="bookmarkStar fa-solid fa-star fa-xl" onClick={() => removeBookmark(data._id)}></i>
                                       :
                                       <i className="bookmarkStar fa-regular fa-star fa-xl" onClick={() => addBookmark(data._id)}></i>
                                    }
                                 </div>
                                 <p className='blogDescription card-text'>{data.description}</p>
                              </div>
                              <div className='d-flex justify-content-between mt-2'>
                                 <p><i className="fa-regular fa-calendar fa-lg me-2"></i> {DateFormat(data?.createdAt)}</p>
                                 <p><i className="fa-regular fa-circle-user fa-lg me-2"></i> {data.createdBy.firstName} {data.createdBy.lastName}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
         <Footer />
      </div>
   )
}

export default Blog