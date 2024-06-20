import asyncHandler from "../middleware/async.js";
import User from "../models/user.js";
import Blog from "../models/blog.js";
import ErrorResponse from "../utils/errorResponse.js";

export const addBookmark = asyncHandler(async (req, res, next) => {
   const { blogId } = req.body;

   const user = await User.findById(req.user.id);

   const isExist = user.blog.find(data => data.blogId.toString() === blogId);

   if (isExist) return next(new ErrorResponse('Already in bookmark', 401))

   user.blog.push({ blogId });

   await user.save();

   res.status(200).json({ success: true, user });
})

export const getBookmark = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.user.id);

   if (!user) return next(new ErrorResponse('User is not found', 401))

   const blogIds = user.blog.map(bookmark => bookmark.blogId);

   const bookmarks = await Blog.find({ _id: { $in: blogIds } });

   if (!bookmarks) return next(new ErrorResponse('No Blog Data', 401));

   res.status(200).json({ success: true, bookmarks });
})

export const removeBookmark = asyncHandler(async (req, res, next) => {
   const { blogId } = req.body;

   const user = await User.findById(req.user.id);

   if (!user) return next(new ErrorResponse('User is not found', 401))

   const bookmarkIndex = user.blog.findIndex(bookmark => bookmark.blogId.toString() == blogId);
   console.log("bookmarkIndex:", bookmarkIndex)

   if (bookmarkIndex === -1) {
      return next(new ErrorResponse('No Blog Data', 401));
   }

   user.blog.splice(bookmarkIndex, 1);

   await user.save();

   res.status(200).json({ success: true, message: "Removed from the bookmark" });

})

