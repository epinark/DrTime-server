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
import {
    protect
} from '../middleware/auth.js';


const userProfileRouter = Router();

userProfileRouter.route('/').get(getUserProfiles).post(protect, createUserProfile);
userProfileRouter.route('/:id').get(getUserProfile).put(protect, updateUserProfile);
userProfileRouter.route('/hausartz').post(protect, createHausArtz).put(protect, updateHausartz);
export default userProfileRouter;