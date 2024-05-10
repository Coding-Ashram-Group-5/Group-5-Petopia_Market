import mongoose, { Document } from 'mongoose';
import { CloudinaryImage } from './user.type.js';

// Interface for a single rating given by a user
export interface IRating {
  userId: mongoose.Schema.Types.ObjectId;
  rating: number;
}

export interface IProduct extends Document {
  productName: string;
  productDescription: string;
  productPrice: number;
  discount?: number;
  productImages: CloudinaryImage[];
  quantity: number;
  creator: mongoose.Schema.Types.ObjectId;
  category: string[];
  created_at: Date;
  updated_at: Date;
  ratings: IRating[];
  averageRating: number;
  deleteImages(): boolean;
  reduceProductQuantity(quantity: number): boolean;
  addRating(userId: string, rating: number): Promise<boolean>;
  calculateAverageRating(): Promise<void>;
}

export type IProductModel = mongoose.Model<IProduct>;
