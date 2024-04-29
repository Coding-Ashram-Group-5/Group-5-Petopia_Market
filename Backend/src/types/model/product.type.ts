import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  productDescription: string;
  productPrice: number;
  discount?: number;
  productImages: string[];
  quantity: number;
  category: string[];
  created_at: Date;
  updated_at: Date;
}

export type IProductModel = mongoose.Model<IProduct>;
