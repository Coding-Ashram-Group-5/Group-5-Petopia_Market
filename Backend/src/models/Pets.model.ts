import mongoose from 'mongoose';

import { IPet, IPetModel } from '../types/model/pets.type.js';

const petSchema: mongoose.Schema<IPet> = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: [true, 'Petname is Required Field'],
    },
    petType: {
      type: String,
      required: [true, 'PetType is Required Field'],
    },
    petBread: {
      type: String,
      default: '',
    },
    petDescription: {
      type: String,
      required: [true, 'Pet Description is Required Field'],
    },
    price: {
      type: Number,
      required: [true, 'Price of Pet is Required Field'],
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    diseases: [
      {
        type: String,
      },
    ],
    petImages: [
      {
        type: String,
        required: [true, 'Pet Images is Required Field'],
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const PetsModel: IPetModel = mongoose.models.Pets || mongoose.model('Pets', petSchema);

export default PetsModel;
