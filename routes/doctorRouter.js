import {
    Router
} from 'express';

import {
    getOneDoctor,
    getAllDoctors,
    createDoctor,
    getDoctorWorkingHours,
    getDoctorAppointments
} from "../controllers/doctorController.js"

const doctorRouter = Router();
doctorRouter.route('/:id').get(getOneDoctor).get(getDoctorWorkingHours).get(getDoctorAppointments);
doctorRouter.route('/').get(getAllDoctors).post(createDoctor);


export default doctorRouter;