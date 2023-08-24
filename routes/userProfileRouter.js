import {
    Router
} from 'express';
import {
    createUserProfile,
    getUserProfile,
    getUserProfiles,
    updateUserProfile,
    createHausArtz,
    updateHausartz
} from '../controllers/userProfileController.js';

const userProfileRouter = Router();

userProfileRouter.route('/').get(getUserProfiles).post(createUserProfile);
userProfileRouter.route('/:id').get(getUserProfile).put(updateUserProfile);
userProfileRouter.route('/hausartz').post(createHausArtz).put(updateHausartz);
export default userProfileRouter;