import mongoose, { Schema, Document } from 'mongoose';

export interface IPet extends Document {
  petName: string;
  petType: string;
  petBread?: string;
  petDescription: string;
  price: number;
  isFree: boolean;
  diseases?: string[];
  petImages: string[];
  owner: Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

export type IPetModel = mongoose.Model<IPet>;
