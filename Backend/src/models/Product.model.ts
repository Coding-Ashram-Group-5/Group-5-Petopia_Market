import { IProduct, IProductModel, IRating } from '../types/model/product.type.js';
import mongoose from 'mongoose';
import { CloudinaryImage } from '../types/model/user.type.js';
import { DeleteAssets } from '../utils/Cloudinary.util.js';

const productSchema: mongoose.Schema<IProduct> = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product Name is Required Field'],
      trim: true,
    },
    productDescription: {
      type: String,
      required: [true, 'Product Description is Required Field'],
      trim: true,
    },
    productPrice: {
      type: Number,
      required: [true, 'Product Price is Required Field'],
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Reference to User is Required for Product'],
    },
    productImages: [
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
    quantity: {
      type: Number,
      required: [true, 'Product Quantity is Required Field'],
      default: 1,
      min: 0,
    },
    category: [
      {
        type: String,
        required: [true, 'Category is Required Field'],
        index: true,
        trim: true,
      },
    ],
    ratings: [
      {
        userId: {
          type: mongoose.Schema.ObjectId,
          ref: 'User', // Assuming there's a User model
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 5, // Assuming a rating scale from 1 to 5
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

productSchema.path('category').validate(function (value: string[]) {
  return value.length >= 1;
}, 'At least one Category is required.');

// Delete Assets
productSchema.methods.deleteImages = async function (): Promise<boolean | null> {
  if (this.productImages.length > 0) {
    return this.productImages.map(async (image: CloudinaryImage) => {
      return await DeleteAssets(image?.publicId);
    });
  }
  return false;
};

// Reduce Product Quantity on Product Purchase
productSchema.methods.reduceProductQuantity = async function (quantity: number): Promise<boolean | null> {
  try {
    if (this.quantity > 0 && this.quantity >= quantity) {
      this.quantity -= quantity;
      await this.save();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error reducing product quantity:', error);
    return null;
  }
};

// Method to add a new rating
productSchema.methods.addRating = async function (userId: string, rating: number): Promise<boolean> {
  try {
    this.ratings.push({ userId, rating });
    await this.calculateAverageRating();
    await this.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Method to calculate the average rating
productSchema.methods.calculateAverageRating = async function (): Promise<void> {
  const totalRatings = this.ratings.reduce((acc: number, curr: IRating) => acc + curr.rating, 0);
  this.averageRating = totalRatings / this.ratings.length;
};

productSchema.pre('save', async function () {
  if (this.isModified('ratings')) {
    await this.calculateAverageRating();
  }
});

const productModel: IProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel;
