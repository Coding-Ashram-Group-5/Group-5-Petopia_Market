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

const router: Router = Router();

// Protected Route
router.route('/create').post(isAuthenticate, uploadMiddleware, addProduct);
router.route('/delete/:id').delete(isAuthenticate, deleteProductById);
router.route('/edit/:id').put(isAuthenticate, uploadMiddleware, editProduct);

router.route('/rating/:id/:rating').patch(isAuthenticate, addRatingofProduct);
router.route('/rating/alter/:id/:rating').patch(isAuthenticate, alterProductRating);

// Public Routes
router.route('/getDetails/all/:limit').get(getAllProduct);
router.route('/getDetails/:id').get(getProductById);

export default router;
