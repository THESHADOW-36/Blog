import mongoose, { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';

const User = new Schema({
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    firstName: {
        type: String,
        required: [true, 'Please enter the first name'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Please enter the last name'],
        trim: true,
    },
    phone: {
        type: Number,
        required: [true, 'Please enter your number'],
        trim: true,
    },
    dob: {
        type: Date,
        required: [true, 'Please enter the Date of Birth'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email address'],
        trim: true,
        unique: true,
        match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        minlength: [6, 'The password must be more than 6 character'],
        select: false
    },
    blog: [{
        _id: false,
        blogId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

User.methods.getJWTWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE
    });
}

export default model('User', User);