import { Router } from 'express';
import { isAuthenticate } from '../middlewares/isAuth.middleware';
import { refreshAccessToken, registerUser, loginUser, logoutUser, deleteAccount } from '../controllers/User.controller';
import { upload } from '../middlewares/multer.middleware';

const router: Router = Router();

router.route('/signup').post(upload.single('avatar'), registerUser);
router.route('/signin').post(loginUser);

// Refresh Access Token
router.route('/refresh/token').get(refreshAccessToken);

// Protected or Secure Route
router.route('/logout').get(isAuthenticate, logoutUser);
router.route('/delete/:id').delete(isAuthenticate, deleteAccount);

export default router;
