import { Router } from 'express';
import PaymentGateway from '../controllers/Payment.controller.js';
import { isAuthenticate } from '../middlewares/isAuth.middleware.js';

const router: Router = Router();

router.route('/order').post(isAuthenticate, PaymentGateway.createPayment);
router.route('/verifyOrder').post(isAuthenticate, PaymentGateway.verifyOrder);

export default router;
