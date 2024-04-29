import { IProduct, IProductModel } from '../types/model/product.type.js';
import mongoose from 'mongoose';

const productSchema: mongoose.Schema<IProduct> = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product Name is Required Field'],
    },
    productDescription: {
      type: String,
      required: [true, 'Product Description is Required Field'],
    },
    productPrice: {
      type: Number,
      required: [true, 'Product Price is Required Field'],
    },
    discount: {
      type: Number,
      default: 0,
    },
    productImages: [
      {
        type: String,
        required: [true, 'Product Images are Required Field'],
      },
    ],
    quantity: {
      type: Number,
      required: [true, 'Product Quantity is Required Field'],
    },
    category: [
      {
        type: String,
        required: [true, 'Category is Required Field'],
        index: true,
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const productModel: IProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel;
