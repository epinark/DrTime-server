import {
    Router
} from 'express';

import {
    changeAppointment,
    createAppointment,
    getAppointments,
    getAppointment,
    deleteAppointment
} from "../controllers/appointmentController.js"

const appointmentRouter = Router();


appointmentRouter.route('/').get(getAppointments).post(createAppointment);

appointmentRouter.route('/:id').get(getAppointment).put(changeAppointment).delete(deleteAppointment);


export default appointmentRouter;