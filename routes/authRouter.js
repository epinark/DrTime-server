import {
    Router
} from 'express';
import {
    signUp,
    signIn,
    getUser,
    updateUser,
    createPrimaryDoctor,
    updatePrimaryDoctor,
} from '../controllers/userController.js';
import validateJOI from '../middleware/validateJOI.js';
import {
    signupSchema,
    signinSchema
} from '../joi/schemas.js';

import {
    protect
} from '../middleware/auth.js';






const authRouter = Router();

authRouter.post('/signup', validateJOI(signupSchema), signUp);


authRouter.post('/signin', validateJOI(signinSchema), signIn);

authRouter.get('/me', protect, getUser);


authRouter.put('/me', updateUser);




authRouter.route('/primaryDoctor')
    .post(createPrimaryDoctor)
    .put(updatePrimaryDoctor);

export default authRouter;