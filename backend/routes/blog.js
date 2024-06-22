import { Router } from "express";
import { addBlog, deleteBlog, editBlog, getBlog, getSingleBlog } from "../controllers/blog.js";
import { protecter } from "../middleware/auth.js";
import { addBookmark, removeBookmark, getBookmark } from "../controllers/bookmark.js";
import upload from "../middleware/multer.js"

const blog = Router();

blog.post('/content', protecter, upload.single('image'), addBlog)
blog.get('/content', getBlog)
blog.get('/content/:id', protecter, getSingleBlog)
blog.put('/content/:id', protecter, upload.single('image'), editBlog)
blog.delete('/content/:id', protecter, deleteBlog)


blog.post('/bookmark', protecter, addBookmark)
blog.get('/bookmark', protecter, getBookmark)
blog.put('/bookmark', protecter, removeBookmark)


export default blog;