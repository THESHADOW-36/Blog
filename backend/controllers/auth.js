import { compare, genSalt, hash } from "bcrypt";
import asyncHandler from "../middleware/async.js";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";


export const register = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, phone, role, dob, email, password } = req.body;

    const salt = await genSalt(10);

    const hashedPass = await hash(password, salt);

    const user = await User.create({ firstName, lastName, phone, role, dob, email, password: hashedPass });

    const token = user.getJWTWebToken();

    res.status(200).json({ success: true, token });
});


export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new ErrorResponse('User not found', 401));

    const isMatch = await compare(password, user.password);

    if (!isMatch) return next(new ErrorResponse('Invalid password', 401));

    const token = user.getJWTWebToken();

    res.status(200).json({ success: true, token, user });
});

export const allUser = asyncHandler(async (req, res, next) => {

    const user = await User.find({})

    res.status(200).json({ success: true, user });
});

export const singleUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id)

    if (!user) return next(new ErrorResponse('User is not found', 401));

    res.status(200).json({ success: true, user });
});

export const getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({ success: true, user });
});

export const editUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { firstName, lastName, phone, dob, role, email, password } = req.body;

    let userId;
    if (id) {
        userId = id;
    } else {
        userId = req.user.id;
    }

    let hashedPass;

    if (password) {
        const salt = await genSalt(10);
        hashedPass = await hash(password, salt);
    }

    const editUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, phone, dob, role, email, password: hashedPass },
        { new: true }
    );

    res.status(200).json({ success: true, message: "User Profile is Edited", editUser });
})


export const deleteUser = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    const user = await User.findByIdAndDelete(id)
    if (!user) return next(new ErrorResponse('No users', 401));

    res.status(200).json({ success: true, user, message: "User Deleted Successfully" });
});
