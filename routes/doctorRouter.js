import {
    Router
} from 'express';

import {
    getOneDoctor,
    getAllDoctors,
    createDoctor,
    getDoctorWorkingHours,
} from "../controllers/doctorController.js"

const doctorRouter = Router();
doctorRouter.route('/:id').get(getOneDoctor).get(getDoctorWorkingHours);
doctorRouter.route('/').get(getAllDoctors).post(createDoctor);


export default doctorRouter;