import { Router } from 'express';
import { isAuthenticate } from '../middlewares/isAuth.middleware.js';
import { redisCacheMiddleware } from '../middlewares/redisCache.middleware.js';
import adminPanelDetails, { getAllUsers, saveCount } from '../controllers/Admin.controller.js';

const router: Router = Router();

// Route to get details of All users
router.route('/details').post(isAuthenticate(true), redisCacheMiddleware({ EX: 21600 }), adminPanelDetails);

// Route to get details of All users
router.route('/all/users').get(isAuthenticate(true), redisCacheMiddleware({ EX: 21600 }), getAllUsers);

router.route('/count').get(saveCount);

export default router;
