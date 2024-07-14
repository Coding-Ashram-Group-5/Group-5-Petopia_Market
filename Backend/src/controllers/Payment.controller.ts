import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import logger from '../utils/logger.util.js';
import { APIError } from '../utils/APIError.util.js';
import { APIResponse } from '../utils/APIResponse.util.js';
import crypto from 'crypto';

class PaymentGateway {
  private KEY_ID: string | undefined;
  private KEY_SECRET: string | undefined;

  constructor() {
    this.KEY_ID = process.env.RAZOR_PAY_KEY_ID;
    this.KEY_SECRET = process.env.RAZOR_PAY_KEY_SECRET;
  }

  public createPayment = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!this.KEY_ID || !this.KEY_SECRET) {
        logger.error('Razorpay Credentials Missing');
        return res.status(502).json(new APIError('Razorpay Credentials Missing', 502));
      }

      const { amount, currency = 'INR', receipt, notes = {} } = req.body;

      if (!amount || !receipt) {
        return res.status(400).json(new APIError('Required Attributes Missing', 400));
      }

      const razorPayInstance = new Razorpay({
        key_id: this.KEY_ID,
        key_secret: this.KEY_SECRET,
      });

      const options = {
        amount: +amount, // Convert to paise
        currency,
        receipt,
        notes,
      };

      const order = await razorPayInstance.orders.create(options);

      logger.info('Order Created Successfully', order);
      return res.status(200).json(new APIResponse('Order Placed Successfully', 200, order));
    } catch (err) {
      logger.error('Failed to Create Order', err);
      return res.status(502).json(new APIError('Failed to Place Order', 502));
    }
  };

  public verifyOrder = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { order_id, payment_id } = req.body;
      const razorpay_signature = req.headers['x-razorpay-signature'] as string;

      if (!razorpay_signature) {
        return res.status(400).json(new APIError('Razorpay Signature is Missing', 400));
      }

      if (!this.KEY_SECRET) {
        return res.status(400).json(new APIError('Razorpay Key Secret is Missing', 400));
      }

      const hmac = crypto.createHmac('sha256', this.KEY_SECRET);
      hmac.update(order_id + '|' + payment_id);
      const generatedSignature = hmac.digest('hex');

      if (razorpay_signature === generatedSignature) {
        return res.status(200).json(new APIResponse('Payment has been Verified', 200, razorpay_signature));
      } else {
        return res.status(400).json(new APIError('Payment Verification Failed', 400));
      }
    } catch (err) {
      logger.error('Payment Verification Error', err);
      return res.status(502).json(new APIError('Payment Verification Error', 502));
    }
  };
}

export default new PaymentGateway();
