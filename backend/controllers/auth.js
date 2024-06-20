import asyncHandler from "../middleware/async.js";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";


export const register = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, phone, role, dob, email, password } = req.body;

    const user = await User.create({ firstName, lastName, phone, role, dob, email, password });

    const token = user.getJWTWebToken();

    res.status(200).json({ success: true, token });
});


export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('User not found', 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid password', 401));
    }

    const token = user.getJWTWebToken();

    res.status(200).json({ success: true, token });
});

export const allUser = asyncHandler(async (req, res, next) => {
    const user = await User.find({})

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
        userId = id
    } else {
        userId = req.user.id
    }

    const editUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, phone, dob, role, email, password },
        { new: true }
    );

    res.status(200).json({ success: true, editUser });
})


export const deleteUser = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    const user = await User.findById(id)

    res.status(200).json({ success: true, user });
});
