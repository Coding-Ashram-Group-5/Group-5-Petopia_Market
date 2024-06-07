import { Router } from 'express';
import { isAuthenticate } from '../middlewares/isAuth.middleware.js';
import {
  addProduct,
  buyAllCartProducts,
  buyProductById,
  deleteCartItemById,
  deleteEntireCart,
  getPurchasedProduct,
} from '../controllers/Cart.controller.js';

const router: Router = Router();

router.route('/:id').get(isAuthenticate, getPurchasedProduct);
router.route('/add/:id').post(isAuthenticate, addProduct);

router.route('/purchase/all').patch(isAuthenticate, buyAllCartProducts);
router.route('/purchase/:id').patch(isAuthenticate, buyProductById);

router.route('/delete/:id').delete(isAuthenticate, deleteCartItemById);
router.route('/delete').delete(isAuthenticate, deleteEntireCart);

export default router;
