import {
    Router
} from 'express';

import {
    getOneDoctor,
    getAllDoctors,
    createDoctor,
    getDoctorWorkingHours,
    // getDoctorAppointments,
    getDoctorsAppointmentsForSelectedDate
} from "../controllers/doctorController.js"

const doctorRouter = Router();
doctorRouter.route('/:id').get(getOneDoctor).get(getDoctorWorkingHours);
doctorRouter.route('/').get(getAllDoctors).post(createDoctor);

// doctorRouter.route('/apps/:id').get(getDoctorAppointments);
doctorRouter.route('/apps/:id/:date').get(getDoctorsAppointmentsForSelectedDate);

export default doctorRouter;