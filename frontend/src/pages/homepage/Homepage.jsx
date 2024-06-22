import React, { useContext, useEffect, useState } from 'react'
import './Homepage.css'
import Footer from '../../components/footer/Footer'
import axios from 'axios'
import { Url } from '../../constant/Url';
import { MyContext } from '../../constant/Context'
import DateFormat from '../../components/utils/DateFormat'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import blogImg from '../../assets/blog-img1.png'
import blogImg2 from '../../assets/blog-img5.jpeg'

const Blog = () => {
   const [blog, setBlog] = useState([]);
   const [bookmark, setBookmark] = useState([]);

   const currentDate = DateFormat(new Date())

   const router = useNavigate();

   const { headers, currentUser } = useContext(MyContext)
   const isAdmin = currentUser?.role === "Admin"

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
         {blog[0] ?
            <div className='w-100 vh-100'>
               <img className='w-100 h-100' src={Url.imgUrl + blog[0]?.image} alt="" />
               <div className='homeContentLay'>
                  <div className='w-100 p-3 mt-5'>
                     <div className='d-flex flex-column flex-lg-row justify-content-between mb-4' >
                        <p className='fs-5 fw-bold mb-3'><i className="fa-regular fa-circle-user fa-lg me-2"></i>{blog[0]?.createdBy?.firstName} {blog[0]?.createdBy?.lastName}</p>
                        <p className='fs-5 fw-bold mb-3 ms-1'><i className="fa-regular fa-calendar fa-lg me-2"></i>{DateFormat(blog[0]?.createdAt)}</p>
                     </div>
                     <p className='fs-1 fw-bold'>{blog[0]?.title}</p>
                     <p className='homeContentDescription mt-4'>{blog[0]?.description}</p>
                  </div>
               </div>
            </div>
            :
            <div className='w-100 vh-100'>
               <img className='w-100 h-100' src={blogImg} alt="" />
               <div className='homeContentLay'>
                  <div className='w-100 p-3 mt-5'>
                     <div className='d-flex flex-column flex-lg-row justify-content-between mb-4' >
                        <>
                           <p className='fs-5 fw-bold mb-3'><i className="fa-regular fa-circle-user fa-lg me-2"></i>Posted By</p>
                           <p className='fs-5 fw-bold mb-3 ms-1'><i className="fa-regular fa-calendar fa-lg me-2"></i>{currentDate}</p>
                        </>
                     </div>
                     <p className='fs-1 fw-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, nesciunt!</p>
                     <p className='homeContentDescription mt-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis porro dolor ut excepturi quas ullam! Quo non quia saepe explicabo libero facilis dolorem nulla vero odit, sequi dolorum omnis repellendus! Quo dolore modi voluptatum quis deserunt, ea, ab veniam consequuntur voluptatibus aut soluta doloribus neque consequatur tempora molestiae delectus hic corrupti optio architecto quam cumque repudiandae repellendus incidunt quod? Eligendi culpa, provident sit similique aperiam labore repellendus blanditiis iure, minus consequatur officiis aliquam vero fugiat necessitatibus reprehenderit amet debitis harum impedit sapiente repellat? Harum alias debitis in aut adipisci soluta id repellat sed unde magnam dolor esse exercitationem enim excepturi atque libero fugit cumque, expedita, inventore ex voluptatibus possimus! Reprehenderit animi quibusdam totam vitae quas dolore suscipit velit doloremque ea obcaecati modi omnis sit amet minima molestiae, dignissimos consectetur veniam incidunt. Iste, vitae debitis, libero ducimus saepe rem minus totam, impedit labore quia unde aperiam! Dicta dolorem harum voluptatibus ipsam, maxime sunt culpa iure illum necessitatibus dolorum consequatur ad unde reiciendis obcaecati ab fuga architecto reprehenderit ullam corrupti earum exercitationem. Vitae totam eius obcaecati sunt, voluptates enim aliquam maiores quia, magni natus officia quod porro veniam iure non accusamus illum animi. Consequuntur quas, fugiat ipsam architecto beatae perspiciatis explicabo dicta eveniet, natus maiores in repudiandae totam reiciendis consequatur doloremque aut sunt tempore aliquam ea, eos amet? Quia, non voluptatum voluptatibus delectus quas voluptate maxime nesciunt sed suscipit quidem tempore ipsum nemo facere iure architecto magnam est enim iusto fuga earum harum nobis. Reiciendis, quas. Deleniti dignissimos accusantium ab. Deserunt ut hic at quidem, sapiente ex veniam maxime commodi ea laboriosam reprehenderit? Earum velit delectus iure labore eos ullam molestiae ipsa, distinctio omnis, sunt facere! Nisi esse nostrum laboriosam, vitae molestias impedit libero eaque sequi et officia voluptates? Adipisci culpa totam recusandae rerum impedit! Optio ea reprehenderit nam. Asperiores, ipsum praesentium!</p>
                  </div>
               </div>
            </div>
         }

         <div className='p-4'>
            <p className='fs-3 fw-bolder mb-4'>Blog</p>
            {blog[0] ?
               <div className='row'>
                  {blog?.map((data, index) => {
                     const rowIndex = Math.floor(index / 3);
                     const colIndex = index % 3;
                     const colOrder = columnOrders[rowIndex % columnOrders.length];
                     return (
                        <div className={`col-xl-${colOrder[colIndex]} col-md-6 mb-4`} key={index}>
                           <div className='card'>
                              <div className='blogImgEdit position-relative'>
                                 <img className='blogImg card-img-top object-fit-cover' src={Url.imgUrl + data.image} alt="" />
                                 {isAdmin &&
                                    <div className='position-absolute bottom-0 start-0 text-white' onClick={() => router(`/edit-blog/${data._id}`)}>
                                       <i class="fa-solid fa-pen-to-square"></i><p>Edit</p>
                                    </div>
                                 }
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
               :
               <div className='row'>
                  <h1 className='text-center my-5'>This is not a database data...</h1>
                  <div className={`col-xl-3 col-md-6 mb-4`}>
                     <div className='card'>
                        <div className='blogImgEdit position-relative'>
                           <img className='blogImg card-img-top object-fit-cover' src={blogImg2} alt="" />
                           {isAdmin &&
                              <div className='position-absolute bottom-0 start-0 text-white' onClick={() => router(`/edit-blog/123`)}>
                                 <i class="fa-solid fa-pen-to-square"></i><p>Edit</p>
                              </div>
                           }
                        </div>
                        <div className='blogInfo card-body d-flex flex-column justify-content-between'>
                           <div>
                              <div className='d-flex align-items-center justify-content-between mb-2'>
                                 <h5 className='blogTitle card-title'>Blog Title</h5>
                                 <i className="bookmarkStar fa-regular fa-star fa-xl"></i>
                              </div>
                              <p className='blogDescription card-text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis porro dolor ut excepturi quas ullam! Quo non quia saepe explicabo libero facilis dolorem nulla vero odit, sequi dolorum omnis repellendus! Quo dolore modi voluptatum quis deserunt, ea, ab veniam consequuntur voluptatibus aut soluta doloribus neque consequatur tempora molestiae delectus hic corrupti optio architecto quam cumque repudiandae repellendus incidunt quod? Eligendi culpa, provident sit similique aperiam labore repellendus blanditiis iure, minus consequatur officiis aliquam vero fugiat necessitatibus reprehenderit amet debitis harum impedit sapiente repellat? Harum alias debitis in aut adipisci soluta id repellat sed unde magnam dolor esse exercitationem enim excepturi atque libero fugit cumque, expedita, inventore ex voluptatibus possimus! Reprehenderit animi quibusdam totam vitae quas dolore suscipit velit doloremque ea obcaecati modi omnis sit amet minima molestiae, dignissimos consectetur veniam incidunt. Iste, vitae debitis, libero ducimus saepe rem minus totam, impedit labore quia unde aperiam! Dicta dolorem harum voluptatibus ipsam, maxime sunt culpa iure illum necessitatibus dolorum consequatur ad unde reiciendis obcaecati ab fuga architecto reprehenderit ullam corrupti earum exercitationem. Vitae totam eius obcaecati sunt, voluptates enim aliquam maiores quia, magni natus officia quod porro veniam iure non accusamus illum animi. Consequuntur quas, fugiat ipsam architecto beatae perspiciatis explicabo dicta eveniet, natus maiores in repudiandae totam reiciendis consequatur doloremque aut sunt tempore aliquam ea, eos amet? Quia, non voluptatum voluptatibus delectus quas voluptate maxime nesciunt sed suscipit quidem tempore ipsum nemo facere iure architecto magnam est enim iusto fuga earum harum nobis. Reiciendis, quas. Deleniti dignissimos accusantium ab. Deserunt ut hic at quidem, sapiente ex veniam maxime commodi ea laboriosam reprehenderit? Earum velit delectus iure labore eos ullam molestiae ipsa, distinctio omnis, sunt facere! Nisi esse nostrum laboriosam, vitae molestias impedit libero eaque sequi et officia voluptates? Adipisci culpa totam recusandae rerum impedit! Optio ea reprehenderit nam. Asperiores, ipsum praesentium!</p>
                           </div>
                           <div className='d-flex justify-content-between mt-2'>
                              <p><i className="fa-regular fa-calendar fa-lg me-2"></i> {currentDate}</p>
                              <p><i className="fa-regular fa-circle-user fa-lg me-2"></i> Posted By</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={`col-xl-4 col-md-6 mb-4`}>
                     <div className='card'>
                        <div className='blogImgEdit position-relative'>
                           <img className='blogImg card-img-top object-fit-cover' src={blogImg2} alt="" />
                           {isAdmin &&
                              <div className='position-absolute bottom-0 start-0 text-white' onClick={() => router(`/edit-blog/123`)}>
                                 <i class="fa-solid fa-pen-to-square"></i><p>Edit</p>
                              </div>
                           }
                        </div>
                        <div className='blogInfo card-body d-flex flex-column justify-content-between'>
                           <div>
                              <div className='d-flex align-items-center justify-content-between mb-2'>
                                 <h5 className='blogTitle card-title'>Blog Title</h5>
                                 <i className="bookmarkStar fa-solid fa-star fa-xl"></i>
                              </div>
                              <p className='blogDescription card-text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis porro dolor ut excepturi quas ullam! Quo non quia saepe explicabo libero facilis dolorem nulla vero odit, sequi dolorum omnis repellendus! Quo dolore modi voluptatum quis deserunt, ea, ab veniam consequuntur voluptatibus aut soluta doloribus neque consequatur tempora molestiae delectus hic corrupti optio architecto quam cumque repudiandae repellendus incidunt quod? Eligendi culpa, provident sit similique aperiam labore repellendus blanditiis iure, minus consequatur officiis aliquam vero fugiat necessitatibus reprehenderit amet debitis harum impedit sapiente repellat? Harum alias debitis in aut adipisci soluta id repellat sed unde magnam dolor esse exercitationem enim excepturi atque libero fugit cumque, expedita, inventore ex voluptatibus possimus! Reprehenderit animi quibusdam totam vitae quas dolore suscipit velit doloremque ea obcaecati modi omnis sit amet minima molestiae, dignissimos consectetur veniam incidunt. Iste, vitae debitis, libero ducimus saepe rem minus totam, impedit labore quia unde aperiam! Dicta dolorem harum voluptatibus ipsam, maxime sunt culpa iure illum necessitatibus dolorum consequatur ad unde reiciendis obcaecati ab fuga architecto reprehenderit ullam corrupti earum exercitationem. Vitae totam eius obcaecati sunt, voluptates enim aliquam maiores quia, magni natus officia quod porro veniam iure non accusamus illum animi. Consequuntur quas, fugiat ipsam architecto beatae perspiciatis explicabo dicta eveniet, natus maiores in repudiandae totam reiciendis consequatur doloremque aut sunt tempore aliquam ea, eos amet? Quia, non voluptatum voluptatibus delectus quas voluptate maxime nesciunt sed suscipit quidem tempore ipsum nemo facere iure architecto magnam est enim iusto fuga earum harum nobis. Reiciendis, quas. Deleniti dignissimos accusantium ab. Deserunt ut hic at quidem, sapiente ex veniam maxime commodi ea laboriosam reprehenderit? Earum velit delectus iure labore eos ullam molestiae ipsa, distinctio omnis, sunt facere! Nisi esse nostrum laboriosam, vitae molestias impedit libero eaque sequi et officia voluptates? Adipisci culpa totam recusandae rerum impedit! Optio ea reprehenderit nam. Asperiores, ipsum praesentium!</p>
                           </div>
                           <div className='d-flex justify-content-between mt-2'>
                              <p><i className="fa-regular fa-calendar fa-lg me-2"></i> {currentDate}</p>
                              <p><i className="fa-regular fa-circle-user fa-lg me-2"></i> Posted By</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={`col-xl-5 col-md-6 mb-4`}>
                     <div className='card'>
                        <div className='blogImgEdit position-relative'>
                           <img className='blogImg card-img-top object-fit-cover' src={blogImg2} alt="" />
                           {isAdmin &&
                              <div className='position-absolute bottom-0 start-0 text-white' onClick={() => router(`/edit-blog/123`)}>
                                 <i class="fa-solid fa-pen-to-square"></i><p>Edit</p>
                              </div>
                           }
                        </div>
                        <div className='blogInfo card-body d-flex flex-column justify-content-between'>
                           <div>
                              <div className='d-flex align-items-center justify-content-between mb-2'>
                                 <h5 className='blogTitle card-title'>Blog Title</h5>
                                 <i className="bookmarkStar fa-regular fa-star fa-xl"></i>
                              </div>
                              <p className='blogDescription card-text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis porro dolor ut excepturi quas ullam! Quo non quia saepe explicabo libero facilis dolorem nulla vero odit, sequi dolorum omnis repellendus! Quo dolore modi voluptatum quis deserunt, ea, ab veniam consequuntur voluptatibus aut soluta doloribus neque consequatur tempora molestiae delectus hic corrupti optio architecto quam cumque repudiandae repellendus incidunt quod? Eligendi culpa, provident sit similique aperiam labore repellendus blanditiis iure, minus consequatur officiis aliquam vero fugiat necessitatibus reprehenderit amet debitis harum impedit sapiente repellat? Harum alias debitis in aut adipisci soluta id repellat sed unde magnam dolor esse exercitationem enim excepturi atque libero fugit cumque, expedita, inventore ex voluptatibus possimus! Reprehenderit animi quibusdam totam vitae quas dolore suscipit velit doloremque ea obcaecati modi omnis sit amet minima molestiae, dignissimos consectetur veniam incidunt. Iste, vitae debitis, libero ducimus saepe rem minus totam, impedit labore quia unde aperiam! Dicta dolorem harum voluptatibus ipsam, maxime sunt culpa iure illum necessitatibus dolorum consequatur ad unde reiciendis obcaecati ab fuga architecto reprehenderit ullam corrupti earum exercitationem. Vitae totam eius obcaecati sunt, voluptates enim aliquam maiores quia, magni natus officia quod porro veniam iure non accusamus illum animi. Consequuntur quas, fugiat ipsam architecto beatae perspiciatis explicabo dicta eveniet, natus maiores in repudiandae totam reiciendis consequatur doloremque aut sunt tempore aliquam ea, eos amet? Quia, non voluptatum voluptatibus delectus quas voluptate maxime nesciunt sed suscipit quidem tempore ipsum nemo facere iure architecto magnam est enim iusto fuga earum harum nobis. Reiciendis, quas. Deleniti dignissimos accusantium ab. Deserunt ut hic at quidem, sapiente ex veniam maxime commodi ea laboriosam reprehenderit? Earum velit delectus iure labore eos ullam molestiae ipsa, distinctio omnis, sunt facere! Nisi esse nostrum laboriosam, vitae molestias impedit libero eaque sequi et officia voluptates? Adipisci culpa totam recusandae rerum impedit! Optio ea reprehenderit nam. Asperiores, ipsum praesentium!</p>
                           </div>
                           <div className='d-flex justify-content-between mt-2'>
                              <p><i className="fa-regular fa-calendar fa-lg me-2"></i> {currentDate}</p>
                              <p><i className="fa-regular fa-circle-user fa-lg me-2"></i> Posted By</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            }
         </div>
         <Footer />
      </div>
   )
}

export default Blog