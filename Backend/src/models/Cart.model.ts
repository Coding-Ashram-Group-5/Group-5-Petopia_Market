import { ICart, ICartModel } from './../types/model/cart.type.js';
import mongoose from 'mongoose';

const cartSchema: mongoose.Schema<ICart> = new mongoose.Schema(
  {
    purchasedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Reference to User is Required'],
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Reference to Product is Required'],
    },
    quantity: {
      type: Number,
      default: 1,
      required: [true, 'Quantity of Product is Required to Add Product in Cart'],
    },
    purchasedPrice: {
      type: Number,
      default: 0,
      required: [true, 'Price of Product is Required to Add Product in Cart'],
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

cartSchema.methods.updateQuantity = async function (newQuantity: number): Promise<boolean> {
  try {
    // Update the quantity field of the cart document
    this.quantity += newQuantity;
    await this.save();
    return true; // Return true indicating successful update
  } catch (error) {
    console.error('Error updating quantity:', error);
    return false; // Return false indicating failed update
  }
};

const cartModel: ICartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default cartModel;
