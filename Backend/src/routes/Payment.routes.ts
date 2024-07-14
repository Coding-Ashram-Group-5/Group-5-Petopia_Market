import { Router } from 'express';
import PaymentGateway from '../controllers/Payment.controller.js';
import { isAuthenticate } from '../middlewares/isAuth.middleware.js';

const router: Router = Router();

router.route('/order').post(isAuthenticate(false), PaymentGateway.createPayment);
router.route('/verifyOrder').post(isAuthenticate(false), PaymentGateway.verifyOrder);

export default router;
