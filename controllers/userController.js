import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../utils/AsyncHandler.js';
import {
    createJWT,
    hashPassword,
    comparePasswords
} from '../utils/auth.js';

export const signUp = asyncHandler(async (req, res, next) => {
    const {
        body: {
            email,
            password,
            ...rest
        },
    } = req;
    const found = await User.findOne({
        email
    });
    if (found) throw new Error('User already exists', 400);
    const hash = await hashPassword(password);

    const user = await User.create({
        ...rest,
        email,
        password: hash,
    });
    const token = createJWT(user._id);
    res.json({
        token
    });
});

export const signIn = asyncHandler(async (req, res) => {
    const {
        body: {
            email,
            password
        },
    } = req;
    const found = await User.findOne({
        email: email,
    }).select('+password');
    if (!found) throw new ErrorResponse("User doesn't exists", 404);
    const isValid = comparePasswords(password, found.password);
    if (!isValid) throw new ErrorResponse('Incorrect password', 401);
    const token = createJWT(found._id);
    res.json({
        token
    });
});


export const getUser = asyncHandler(async (req, res) => {
    const {
        userId
    } = req;
    const user = await User.findById(userId);
    res.status(201).json(user);
});
export const updateUser = asyncHandler(async (req, res, next) => {
    const {
        body,
        params: {
            id
        },
    } = req;

    const updatedUser = await User.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });

    if (!updatedUser)
        throw new ErrorResponse(`User profile with id of ${id} doesn't exist`, 404);

    res.json(updatedUser);
});
export const createPrimaryDoctor = asyncHandler(async (req, res, next) => {
    const {
        userId,
        doctorId
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new ErrorResponse('User not found', 404);
    }

    user.primaryDoctor = doctorId;
    await user.save();

    res.status(200).json({
        message: "Primary doctor assigned successfully."
    });
});


export const updatePrimaryDoctor = asyncHandler(async (req, res, next) => {
    const {
        userId,
        doctorId
    } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ErrorResponse('User not found', 404);
        }

        user.primaryDoctor = doctorId;
        await user.save();

        res.status(200).json({
            message: "Primary Doctor updated successfully."
        });
    } catch (error) {
        next(error);
    }
});