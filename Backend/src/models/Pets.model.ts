import mongoose from 'mongoose';

import { IPet, IPetModel } from '../types/model/pets.type.js';
import { DeleteAssets } from '../utils/Cloudinary.util.js';
import { CloudinaryImage } from '../types/model/user.type.js';

const petSchema: mongoose.Schema<IPet> = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: [true, 'Petname is Required Field'],
      trim: true,
    },
    petType: {
      type: String,
      required: [true, 'PetType is Required Field'],
      trim: true,
    },
    petBread: {
      type: String,
      default: '',
      trim: true,
    },
    petDescription: {
      type: String,
      required: [true, 'Pet Description is Required Field'],
      trim: true,
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
    isAdopted: {
      type: Boolean,
      default: false,
    },
    diseases: {
      type: String,
      default: '',
      trim: true,
    },
    petImages: [
      {
        publicId: {
          type: String,
          default: '',
        },
        url: {
          type: String,
          default: '',
        },
      },
    ],
    owner: {
      type: mongoose.Schema.ObjectId,
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

// Adding minimum length validation for petImages
petSchema.path('petImages').validate(function (value: string[]) {
  return value.length >= 1;
}, 'At least one pet image is required.');

petSchema.methods.deleteImages = async function (): Promise<boolean | null> {
  if (this.petImages.length > 0) {
    return this.petImages.map(async (image: CloudinaryImage) => {
      return await DeleteAssets(image?.publicId);
    });
  }
  return true;
};
const PetsModel: IPetModel = mongoose.models.Pets || mongoose.model('Pets', petSchema);

export default PetsModel;
