import mongoose, { Document } from 'mongoose';

export interface ICart extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  purchasedBy: mongoose.Schema.Types.ObjectId;
  quantity: number;
  purchasedPrice: number;
  isPurchased: boolean;
  updateQuantity(newQuantity: number): Promise<boolean>;
}

export type ICartModel = mongoose.Model<ICart>;
