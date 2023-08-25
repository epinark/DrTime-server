import Doctor from "../models/Doctor.js";
import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getOneDoctor = asyncHandler(async (req, res) => {
    const {
        params: {
            id
        },
    } = req;

    const doctor = await Doctor.findById(id);

    if (!doctor)
        throw new ErrorResponse(`Doctor with id of ${id} doesn't exist`, 404);

    res.json(doctor);
});

export const getAllDoctors = asyncHandler(async (req, res, next) => {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
});

export const createDoctor = asyncHandler(async (req, res, next) => {
    const {
        title,
        name,
        specialization,
        address,
        timings,
        profilePhoto
    } = req.body;

    const newDoctor = await Doctor.create({
        title,
        name,
        specialization,
        address,
        timings,
        profilePhoto,
    });

    res.status(201).json(newDoctor);
});