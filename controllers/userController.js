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