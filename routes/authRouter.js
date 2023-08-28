import {
    Router
} from 'express';
import {
    signUp,
    signIn,
} from '../controllers/userController.js';
import validateJOI from '../middleware/validateJOI.js';
import {
    sigupSchema,
    siginSchema
} from '../joi/schemas.js';


const authRouter = Router();

authRouter.post('/signup', validateJOI(sigupSchema), signUp);
authRouter.post('/signin', validateJOI(siginSchema), signIn);

export default authRouter;