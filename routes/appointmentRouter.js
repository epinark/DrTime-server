import {
    Router
} from 'express';

import {
    changeAppointment,
    createAppointment,
    getAppointments,
    getAppointment,
    deleteAppointment
} from "../controllers/appointmentController.js";
import {
    protect
} from '../middleware/auth.js';


const appointmentRouter = Router();


appointmentRouter.route('/').get(getAppointments).post(protect, createAppointment);

appointmentRouter.route('/:id').get(getAppointment).put(protect, changeAppointment).delete(protect, deleteAppointment);


export default appointmentRouter;