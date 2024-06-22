
// Auth
const register = "http://localhost:8000/api/v1/auth/register"  // Post
const login = "http://localhost:8000/api/v1/auth/login"  // Post
const currentUser = "http://localhost:8000/api/v1/auth/current-user"  // get
const singleUser = "http://localhost:8000/api/v1/auth/single-user/"  // get
const allUser = "http://localhost:8000/api/v1/auth/all-user"  // get
const editCurrentUser = "http://localhost:8000/api/v1/auth/edit-user"  // put
const editSingleUser = "http://localhost:8000/api/v1/auth/edit-user/"  // put
const deleteUser = "http://localhost:8000/api/v1/auth/delete-user/"  // delete

// Blog
const addBlog = "http://localhost:8000/api/v1/blog/content"  // Post
const getBlog = "http://localhost:8000/api/v1/blog/content"  // get
const getSingleBlog = "http://localhost:8000/api/v1/blog/content/"  // get
const editBlog = "http://localhost:8000/api/v1/blog/content/"  // put
const deleteBlog = "http://localhost:8000/api/v1/blog/content/"  // delete

// Bookmark
const addBookmark = "http://localhost:8000/api/v1/blog/bookmark"  // Post
const getBookmark = "http://localhost:8000/api/v1/blog/bookmark"  // get
const removeBookmark = "http://localhost:8000/api/v1/blog/bookmark"  // put

export const Url = {
   register,
   login,
   currentUser,
   singleUser,
   allUser,
   editCurrentUser,
   editSingleUser,
   deleteUser,
   addBlog,
   getBlog,
   getSingleBlog,
   editBlog,
   deleteBlog,
   addBookmark,
   getBookmark,
   removeBookmark,
};
