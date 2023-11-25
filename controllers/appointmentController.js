import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from "../models/Appointment.js";
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

import moment from 'moment';

export const getAppointments = asyncHandler(async (req, res, next) => {
    try {
        console.log('getAppointments function started');
        const {
            userId
        } = req.params;

        const appointments = await Appointment.find({
                userId: userId
            })
            .populate('user', 'firstName lastName')
            .populate('doctor', 'name')
            .exec();

        console.log('Appointments retrieved:', appointments);

        res.json(appointments);
    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
});

export const getAppointment = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;

    const appointment = await Appointment.findById(id)
        .populate('user', 'firstName lastName')
        .populate('doctor', 'name').exec();

    if (!appointment)
        throw new ErrorResponse(`Appointment with id of ${id} doesn't exist`, 404);
    res.send(appointment);
});
export const createAppointment = asyncHandler(async (req, res, next) => {
    try {
        const {
            user,
            doctor,
            appointmentdate,
            appointmenttime,
            description
        } = req.body;

        const [hours, minutes] = appointmenttime.split(":");
        const parsedAppointmentDate = new Date(appointmentdate);
        parsedAppointmentDate.setUTCHours(hours, minutes, 0, 0);




        const newAppointment = await Appointment.create({
            user,
            doctor,
            appointmentdate: parsedAppointmentDate,
            description,
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        next(error);
    }
});



// export const changeAppointment = asyncHandler(async (req, res) => {
//     const {
//         id
//     } = req.params;
//     const {
//         userId
//     } = req;

//     const found = await Appointment.findById(id);
//     if (!found)
//         throw new ErrorResponse(`Appointment with id of ${id} doesn't exist`, 404);
//     const updatedAppointment = await Appointment.findOneAndUpdate({
//         _id: id
//     }, {
//         ...req.body
//     }, {
//         new: true
//     });

//     res.json(updatedAppointment);
// });

export const deleteAppointment = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        userId
    } = req;

    const found = await Appointment.findById(id);
    if (!found)
        throw new ErrorResponse(`Appointment with id of ${id} doesn't exist`);

    await Appointment.deleteOne({
        _id: id
    });

    res.json({
        success: `Appointment with id of ${id} was deleted`
    });
});