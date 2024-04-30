import mongoose, { Document, Types } from 'mongoose';
import { CloudinaryImage } from './user.type.js';

export interface IBlog extends Document {
  title: string;
  content: string;
  coverImage: CloudinaryImage;
  category: string[];
  likes?: number;
  commentType: Types.ObjectId;
  owner: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

export type IBlogModel = mongoose.Model<IBlog>;
