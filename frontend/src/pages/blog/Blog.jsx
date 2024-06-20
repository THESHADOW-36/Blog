import React from 'react'
import './Blog.css'
import blogImg from './../../assets/web_app.jpg'

const Blog = () => {
   const blogContent = [
      {
         image: "./../../assets/web_app.jpg",
         title: "Software Web Development Fresher",
         description: "Web development is the work involved in developing a website for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which Web development commonly refers, may include Web engineering, Web design, Web content development, client liaison, client-side/server-side scripting, Web server and network security configuration, and e-commerce development.",
         category: "Software",
         postedBy: "Dinesh Thiru",
         postedAt: "20-06-2024",
      },
      {
         image: "./../../assets/web_app.jpg",
         title: "Web Development",
         description: "Web development is the work involved in developing a website for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which Web development commonly refers, may include Web engineering, Web design, Web content development, client liaison, client-side/server-side scripting, Web server and network security configuration, and e-commerce development.",
         category: "Software",
         postedBy: "Dinesh Thiru",
         postedAt: "20-06-2024",
      },
      {
         image: "./../../assets/web_app.jpg",
         title: "Web Development",
         description: "Web development is the work involved in developing a website for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which Web development commonly refers, may include Web engineering, Web design, Web content development, client liaison, client-side/server-side scripting, Web server and network security configuration, and e-commerce development.",
         category: "Software",
         postedBy: "Dinesh Thiru",
         postedAt: "20-06-2024",
      },
      {
         image: "./../../assets/web_app.jpg",
         title: "Web Development",
         description: "Web development is the work involved in developing a website for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which Web development commonly refers, may include Web engineering, Web design, Web content development, client liaison, client-side/server-side scripting, Web server and network security configuration, and e-commerce development.",
         category: "Software",
         postedBy: "Dinesh Thiru",
         postedAt: "20-06-2024",
      },
      {
         image: "./../../../assets/web_app.jpg",
         title: "Web Development",
         description: "Web development is the work involved in developing a website for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which Web development commonly refers, may include Web engineering, Web design, Web content development, client liaison, client-side/server-side scripting, Web server and network security configuration, and e-commerce development.",
         category: "Software",
         postedBy: "Dinesh Thiru",
         postedAt: "20-06-2024",
      },
   ]
   return (
      <div className='blogLay'>
         <div className='row'>
            {blogContent.map((blog, index) => (
               <div className='col-4 mb-4' key={index}>
                  <div className='blogContent rounded'>
                     <div className='blogImg position-relative'>
                        <img className='rounded-top w-100 object-fit-cover' src={blogImg} />
                        <div className='tag'>
                           <p>{blog.category}</p>
                        </div>
                     </div>
                     <div className='blogInfo rounded-bottom d-flex flex-column justify-content-between px-3 py-2'>
                        <div>
                           <div className='d-flex align-items-center justify-content-between mb-2'>
                              <p className='blogTitle'>{blog.title}</p>
                              <i class="fa-regular fa-star fa-lg"></i>
                              {/* <i class="fa-solid fa-star fa-lg"></i> */}
                           </div>
                           <p className='blogDescription'>{blog.description}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                           <p><i class="fa-solid fa-user"></i> {blog.postedBy}</p>
                           <p><i class="fa-regular fa-calendar"></i> {blog.postedAt}</p>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Blog