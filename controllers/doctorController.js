import Doctor from "../models/Doctor.js";
import asyncHandler from '../utils/AsyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getOneDoctor = asyncHandler(async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({
                message: `Doctor with id of ${id} doesn't exist`
            });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching doctor',
            error: error.message,
        });
    }
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
export const getDoctorWorkingHours = async (req, res, next) => {
    try {
        const {
            doctorId
        } = req.params;


        const doctor = await Doctor.findById(doctorId);

        const workingHours = doctor.timings;

        res.status(200).json(workingHours);
    } catch (error) {
        next(error);
    }
};