import {
    Router
} from 'express';

import {
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

appointmentRouter.route('/:id').get(getAppointment).delete(protect, deleteAppointment);


export default appointmentRouter;