import { Router } from 'express';
import { isAuthenticate } from '../middlewares/isAuth.middleware.js';
import { uploadMiddleware } from '../middlewares/multer.middleware.js';
import {
  addProduct,
  addRatingofProduct,
  alterProductRating,
  deleteProductById,
  editProduct,
  getAllProduct,
  getProductById,
} from '../controllers/Product.controller.js';
import { redisCacheMiddleware, redisFlush } from '../middlewares/redisCache.middleware.js';

const router: Router = Router();

// Protected Route
router.route('/create').post(isAuthenticate(false), uploadMiddleware, redisFlush, addProduct);
router.route('/delete/:id').delete(isAuthenticate(false), redisFlush, deleteProductById);
router.route('/edit/:id').put(isAuthenticate(false), uploadMiddleware, redisFlush, editProduct);

router.route('/rating/:id/:rating').patch(isAuthenticate(false), redisFlush, addRatingofProduct);
router.route('/rating/alter/:id/:rating').patch(isAuthenticate(false), redisFlush, alterProductRating);

// Public Routes
router.route('/getDetails/all/:limit').get(redisCacheMiddleware({ EX: 21600 }), getAllProduct);
router.route('/getDetails/:id').get(getProductById);

export default router;
