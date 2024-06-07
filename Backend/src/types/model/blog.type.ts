import mongoose, { Document, Types } from 'mongoose';
import { CloudinaryImage } from './user.type.js';
import { IComment } from '../../models/Comment.model.js';

export interface IBlog extends Document {
  title: string;
  content: string;
  coverImage: CloudinaryImage;
  category: string[];
  likes?: string[];
  comments: Types.ObjectId[];
  owner: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
  addLike(userId: string): Promise<boolean | null>;
  removeLike(userId: string): Promise<boolean | null>;
  addComment(comment: IComment): Promise<boolean | null>;
  removeComment(commentId: string): Promise<boolean | null>;
}

export type IBlogModel = mongoose.Model<IBlog>;
