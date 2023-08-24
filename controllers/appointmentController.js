import Appointment from "../models/Appointment.js";
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

import moment from 'moment';

export const getAppointments = asyncHandler(async (req, res, next) => {
    try {
        const appointments = await Appointment.find()
            .populate('user', 'firstName lastName')
            .populate('doctor', 'name specialization');

        res.json(appointments);
    } catch (error) {
        next(error);
    }
});

export const getAppointment = asyncHandler(async (req, res, next) => {
    const {
        id
    } = req.params;

    const appointment = await Appointment.findById(id)
        .populate('user', 'firstName lastName')
        .populate('doctor', 'name specialization');

    if (!appointment)
        throw new ErrorResponse(`Appointment with id of ${id} doesn't exist`, 404);
    res.send(appointment);
});

export const createAppointment = asyncHandler(async (req, res, next) => {
    const {
        user,
        doctor,
        date,
        time,
        description
    } = req.body;

    const appointmentDate = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");


    const newAppointment = await Appointment.create({
        user,
        doctor,
        Appointmentdate: appointmentDate.toDate(),
        description,
    });

    res.status(201).json(newAppointment);
});


export const changeAppointment = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        userId
    } = req;

    const found = await Appointment.findById(id);
    if (!found)
        throw new ErrorResponse(`Appointment with id of ${id} doesn't exist`, 404);
    const updatedAppointment = await Appointment.findOneAndUpdate({
        _id: id
    }, {
        ...req.body
    }, {
        new: true
    });

    res.json(updatedAppointment);
});

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