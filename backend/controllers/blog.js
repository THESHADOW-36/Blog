import asyncHandler from "../middleware/async.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

export const addBlog = asyncHandler(async (req, res, next) => {
   const { title, description, category, image } = req.body;

   const user = await User.findById(req.user.id).select('-role -phone -dob -password -blog -createdAt -__v')

   const blog = await Blog.create({ title, description, category, image, createdBy: user });

   res.status(200).json({ success: true, blog });
})

export const getBlog = asyncHandler(async (req, res, next) => {
   const blog = await Blog.find({});

   if (!blog) return next(new ErrorResponse('No Blog Data', 401))

   res.status(200).json({ success: true, blog });
})

export const editBlog = asyncHandler(async (req, res, next) => {
   const { id } = req.params;

   const { title, description, category, image } = req.body;

   const blog = await Blog.findByIdAndUpdate(id, { title, description, category, image, updatedBy: req.user.id, updatedAt: new Date() }, { new: true });

   if (!blog) return next(new ErrorResponse('No Blog Data', 401))

   res.status(200).json({ success: true, blog });
})

export const deleteBlog = asyncHandler(async (req, res, next) => {
   const { id } = req.params;

   const blog = await Blog.findByIdAndDelete(id);

   if (!blog) return next(new ErrorResponse('No Blog Data', 401))

   res.status(200).json({ success: true, blog });

})

