import mongoose, { Schema } from "mongoose";


const Blog = new Schema({
   title: {
      type: String,
      required: [true, 'Please enter the Blog Title'],
      trim: true
   },
   description: {
      type: String,
      trim: true
   },
   category: {
      type: String,
      trim: true
   },
   image: {
      type: String,
   },
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   updatedAt: {
      type: Date
   }
})

export default mongoose.model('Blog', Blog)