import mongoose, { Document } from 'mongoose';
import { CloudinaryImage } from './user.type.js';

export interface IProduct extends Document {
  productName: string;
  productDescription: string;
  productPrice: number;
  discount?: number;
  productImages: CloudinaryImage[];
  quantity: number;
  category: string[];
  created_at: Date;
  updated_at: Date;
}

export type IProductModel = mongoose.Model<IProduct>;
