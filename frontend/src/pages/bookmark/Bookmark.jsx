import React, { useContext, useEffect, useState } from 'react'
import './Bookmark.css'
import axios from 'axios';
import { MyContext } from '../../constant/Context';
import { Url } from '../../constant/Url';
import DateFormat from '../../components/utils/DateFormat';

const Bookmark = () => {
   const [bookmark, setBookmark] = useState([]);

   const { headers } = useContext(MyContext)

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

   const removeBookmark = async (id) => {
      try {
         const blogId = id;
         await axios.put(Url.removeBookmark, { blogId }, { headers })
            .then((res) => {
               console.log(res.data)
               getBookmark();
            })
            .catch((error) => console.log(error))
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getBookmark();
      // eslint-disable-next-line
   }, [])
   return (
      <div className='bookmark'>
         <div className='row mt-5'>
            {bookmark[0] ?
               <>
                  {bookmark?.map((data, index) => (
                     <div className='col-6 mb-4' key={index}>
                        <div className='bookmarkInfo rounded d-flex'>
                           <div className='bookmarkImg'>
                              <img className='w-100 h-100 rounded-start object-fit-cover' src={`http://localhost:8000/uploads/${data.image}`} alt="" />
                              <div className='bookmarkAction'>
                                 <p onClick={() => removeBookmark(data._id)}>Remove</p>
                              </div>
                           </div>
                           <div className='bookmarkImg bg-white rounded-end w-50 d-flex flex-column justify-content-between p-2 py-3'>
                              <div>
                                 <p className='bookmarkTitle'>{data.title}</p>
                                 <p className='bookmarkDescription'>{data.description}</p>
                              </div>
                              <div className='d-flex align-items-center justify-content-between'>
                                 <p><i className="fa-regular fa-circle-user fa-lg me-1"></i>{data.createdBy.firstName} {data.createdBy.lastName}</p>
                                 <p><i className="fa-regular fa-calendar fa-lg me-1"></i>{DateFormat(data.createdAt)}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </>
               :
               <h1 className='text-center text-white my-5'>No Bookmarks</h1>
            }
         </div>
      </div>
   )
}

export default Bookmark