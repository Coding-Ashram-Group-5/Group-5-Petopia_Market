import { Router } from 'express';
import { isAuthenticate } from '../middlewares/isAuth.middleware.js';
import {
  addProduct,
  buyAllCartProducts,
  buyProductById,
  deleteCartItemById,
  deleteEntireCart,
  getCartProduct,
  getPurchasedProduct,
} from '../controllers/Cart.controller.js';
import { redisCacheMiddleware } from '../middlewares/redisCache.middleware.js';

const router: Router = Router();

router.route('/:id').get(isAuthenticate(false), getPurchasedProduct);
router.route('/product/:id').get(isAuthenticate(false), getCartProduct);
router.route('/add/:id').post(isAuthenticate(false), addProduct);

router.route('/purchase/all').patch(isAuthenticate(false), buyAllCartProducts);
router.route('/purchase/:id').patch(isAuthenticate(false), buyProductById);

router.route('/delete/:id').delete(isAuthenticate(false), deleteCartItemById);
router.route('/delete').delete(isAuthenticate(false), deleteEntireCart);

export default router;
