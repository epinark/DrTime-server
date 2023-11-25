import Doctor from "../models/Doctor.js";
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Appointment from "../models/Appointment.js";
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
// export const getDoctorAppointments = asyncHandler(async (req, res) => {
//     try {
//         const {
//             id
//         } = req.params;


//         const appointments = await Appointment.find({
//                 doctor: id
//             })
//             .populate('user')
//             .exec();

//         res.json(appointments);
//     } catch (error) {
//         let errorMessage = 'Internal Server Error';

//         if (error.response) {
//             console.error('Server Error:', error.response.data);
//         } else if (error.request) {
//             console.error('Request Error:', error.request);
//         } else {
//             errorMessage = error.message;
//         }

//         res.status(500).json({
//             error: errorMessage
//         });
//     }
// });

export const getDoctorsAppointmentsForSelectedDate = asyncHandler(async (req, res) => {
    try {
        const {
            id,
            date
        } = req.params;


        const appointmentsForSelectedDate = await Appointment.find({
                doctor: id,
                appointmentdate: {
                    $gte: new Date(`${date}T00:00:00.000Z`),
                    $lt: new Date(`${date}T23:59:59.999Z`),
                },
            })
            .populate('user')
            .exec();

        res.json(appointmentsForSelectedDate);
    } catch (error) {
        let errorMessage = 'Internal Server Error';

        if (error.response) {
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            errorMessage = error.message;
        }

        res.status(500).json({
            error: errorMessage
        });
    }
});