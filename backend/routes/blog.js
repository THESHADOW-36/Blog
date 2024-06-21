import { Router } from "express";
import { addBlog, deleteBlog, editBlog, getBlog } from "../controllers/blog.js";
import { protecter } from "../middleware/auth.js";
import { addBookmark, removeBookmark, getBookmark } from "../controllers/bookmark.js";

const blog = Router();

blog.post('/content', protecter, addBlog)
blog.get('/content', getBlog)
blog.put('/content/:id', protecter, editBlog)
blog.delete('/content/:id', protecter, deleteBlog)


blog.post('/bookmark', protecter, addBookmark)
blog.get('/bookmark', protecter, getBookmark)
blog.put('/bookmark', protecter, removeBookmark)


export default blog;