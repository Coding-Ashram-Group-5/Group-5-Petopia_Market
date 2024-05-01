import mongoose, { Schema, Document } from 'mongoose';
import { CloudinaryImage } from './user.type.js';

export interface IPet extends Document {
  petName: string;
  petType: string;
  petBread?: string;
  petDescription: string;
  price: number;
  isFree: boolean;
  isAdopted: boolean;
  diseases?: string;
  petImages: CloudinaryImage[];
  owner: Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
  deleteImages(): boolean;
}

export type IPetModel = mongoose.Model<IPet>;
