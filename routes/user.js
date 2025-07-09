// routes/user.js

import express from 'express';
import allowAuthenticated from '../mdwares/allowAuthenticated.js';
import { showProfile, showGuestProfile, handleEditProfile,showEditForm} from '../logic/user/index.js';
import profileUploader from '../mdwares/uploadProfilePic.js';
const router = express.Router();
const UserRouter = router;

router.get('/profile',allowAuthenticated, showProfile)

router.get('/user/:username', allowAuthenticated, showGuestProfile)
router.get('/profile/edit',allowAuthenticated,showEditForm)
router.post('/profile/edit',allowAuthenticated, profileUploader, handleEditProfile)
export default UserRouter;