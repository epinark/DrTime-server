import {
    Router
} from 'express';

import {
    getOneDoctor,
    getAllDoctors,
    createDoctor,
} from "../controllers/doctorController.js"

const doctorRouter = Router();
doctorRouter.route('/:id', getOneDoctor);
doctorRouter.route('/').get(getAllDoctors).post(createDoctor);


export default doctorRouter;