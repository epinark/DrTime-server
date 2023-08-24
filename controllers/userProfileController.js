import UserProfile from '../models/UserProfile.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
export const createUserProfile = asyncHandler(async (req, res, next) => {
    const {
        gender,
        user,
        birthDate,
        mobilePhone,
        address,
        insuranceNumber,
        profilePhoto
    } = req.body;

    const newUserProfile = await UserProfile.create({
        gender,
        user,
        birthDate,
        mobilePhone,
        address,
        insuranceNumber,
        profilePhoto
    });

    res.status(201).json(newUserProfile);
});
export const getUserProfiles = asyncHandler(async (req, res, next) => {
    const userProfiles = await UserProfile.find();
    res.json(userProfiles);
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
    const {
        params: {
            id
        },
    } = req;

    const userProfile = await UserProfile.findById(id);

    if (!userProfile)
        throw new ErrorResponse(`User profile with id of ${id} doesn't exist`, 404);

    res.json(userProfile);
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
    const {
        body,
        params: {
            id
        },
    } = req;

    const updatedUserProfile = await UserProfile.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });

    if (!updatedUserProfile)
        throw new ErrorResponse(`User profile with id of ${id} doesn't exist`, 404);

    res.json(updatedUserProfile);
});

export const createHausArtz = asyncHandler(async (req, res, next) => {
    const {
        userId,
        doctorId
    } = req.body;

    const userProfile = await UserProfile.findOne({
        user: userId
    });
    userProfile.hausArtz = doctorId;
    await userProfile.save();

    res.status(200).json({
        message: "Hausartz assigned successfully."
    });
});

export const updateHausartz = asyncHandler(async (req, res, next) => {
    const {
        userId,
        doctorId
    } = req.body;

    const userProfile = await UserProfile.findOne({
        user: userId
    });
    userProfile.primaryDoctor = doctorId;
    await userProfile.save();

    res.status(200).json({
        message: "Hausartz updated successfully."
    });
});