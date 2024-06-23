
//Hosted Site
const localhost = "http://localhost:8000/"
const hostedUrl = "https://blog-vspx.onrender.com"
const imgUrl = "https://blog-vspx.onrender.com/uploads/"

// Auth
const register = "https://blog-vspx.onrender.com/api/v1/auth/register"  // Post
const login = "https://blog-vspx.onrender.com/api/v1/auth/login"  // Post
const currentUser = "https://blog-vspx.onrender.com/api/v1/auth/current-user"  // get
const singleUser = "https://blog-vspx.onrender.com/api/v1/auth/single-user/"  // get
const allUser = "https://blog-vspx.onrender.com/api/v1/auth/all-user"  // get
const editCurrentUser = "https://blog-vspx.onrender.com/api/v1/auth/edit-user"  // put
const editSingleUser = "https://blog-vspx.onrender.com/api/v1/auth/edit-user/"  // put
const deleteUser = "https://blog-vspx.onrender.com/api/v1/auth/delete-user/"  // delete

// Blog
const addBlog = "https://blog-vspx.onrender.com/api/v1/blog/content"  // Post
const getBlog = "https://blog-vspx.onrender.com/api/v1/blog/content"  // get
const getSingleBlog = "https://blog-vspx.onrender.com/api/v1/blog/content/"  // get
const editBlog = "https://blog-vspx.onrender.com/api/v1/blog/content/"  // put
const deleteBlog = "https://blog-vspx.onrender.com/api/v1/blog/content/"  // delete

// Bookmark
const addBookmark = "https://blog-vspx.onrender.com/api/v1/blog/bookmark"  // Post
const getBookmark = "https://blog-vspx.onrender.com/api/v1/blog/bookmark"  // get
const removeBookmark = "https://blog-vspx.onrender.com/api/v1/blog/bookmark"  // put

export const Url = {
   hostedUrl,
   imgUrl,
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
