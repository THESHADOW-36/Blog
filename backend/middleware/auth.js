import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "./async.js";


export const protecter = asyncHandler(async (req, res, next) => {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
   }
   
   if (!token) {
      return next(new ErrorResponse('Token not found!', 401));
   }

   try {
      const jwtVerify = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);

      req.user = await User.findById(jwtVerify.id);
      
      next();
   } catch (error) {
      return next(new ErrorResponse('You dont have access', 401));
   }
})