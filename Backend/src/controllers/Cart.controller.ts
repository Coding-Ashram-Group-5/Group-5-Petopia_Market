import { Response } from 'express';

import CartModel from '../models/Cart.model.js';
import Product from '../models/Product.model.js';
import { IGetUserAuthInfoRequest } from '../types/model/user.type.js';
import AsyncHandler from '../utils/AsyncHandler.util.js';
import { APIError } from '../utils/APIError.util.js';
import { APIResponse } from '../utils/APIResponse.util.js';

const addProduct = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    // checking existence existence of ID Query Parameter
    if (!id) {
      return res.status(402).json(new APIError('Required Parameter ID is Missing', 402));
    }
    const productDetail = await Product.findById(id);
    // checking if Product exist or not
    if (!productDetail) {
      return res.status(302).json(new APIError(`Product with Id:${id} Doesn't Exist`, 302));
    }

    const availableProductQuantity = productDetail.quantity;
    if (availableProductQuantity < quantity || availableProductQuantity === 0) {
      return res
        .status(402)
        .json(new APIError(`There is Just ${availableProductQuantity} Unit Available but Required ${quantity}`, 402));
    }

    const isProductExistInCart = await CartModel.find({
      productId: id,
      purchasedBy: req.user?._id,
      isPurchased: false,
    });

    if (isProductExistInCart.length > 0) {
      await isProductExistInCart[0].updateQuantity(+quantity);
      res.status(200).json(new APIResponse('Product Purchased Successfully', 200, isProductExistInCart[0]));
    } else {
      const addNewProductInCart = await CartModel.create({
        productId: productDetail?._id,
        purchasedBy: req.user?._id,
        quantity,
        purchasedPrice: productDetail?.productPrice,
      });
      if (!addNewProductInCart) {
        return res.status(502).json(new APIError('Failed to add a New Product in Your Cart Sorry', 502));
      }
      res.status(200).json(new APIResponse('Product Purchased Successfully', 200, addNewProductInCart));
    }
  } catch (error: any) {
    console.log(error);
    res.status(502).json(new APIError(error?.message || 'Error While Adding Product in Cart with Id'));
  }
});

const getPurchasedProduct = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const getPurchasedProduct: any = await CartModel.aggregate([
      {
        $match: { purchasedBy: userId, _id: { $exists: true, $ne: null }, isPurchased: true },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'purchasedBy',
          foreignField: '_id',
          as: 'userData',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $unset: [
          'productId',
          'purchasedBy',
          'userData.password',
          'userData.refreshToken',
          'userData.__v',
          '__v',
          'productDetails.__v',
          'productDetails.owner',
          'isPurchased',
        ],
      },
      {
        $unwind: '$productDetails',
      },
      {
        $unwind: '$userData',
      },
    ]);
    if (!getPurchasedProduct.length) {
      return res.status(200).json(new APIResponse("You haven't purchased any products yet.", 200, []));
    }

    res
      .status(200)
      .json(
        new APIResponse(
          `Here is Your Cart ${getPurchasedProduct[0]?.userData?.firstName}`,
          200,
          getPurchasedProduct[0],
        ),
      );
  } catch (error: any) {
    console.log(error);
    res.status(502).json(new APIError(error?.message || 'Error While Fetching Cart Details'));
  }
});

const buyProductById = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  let currentPrice: number = 0;
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json(new APIError('Product ID is required', 400));
    }

    const productDetail = await Product.findById(id);

    if (!productDetail) {
      return res.status(302).json(new APIError('Product is not Available Now Sorry', 302));
    }

    // Find the cart item by ID
    const cartItem = await CartModel.findOne({
      productId: id,
      purchasedBy: req.user?._id,
      isPurchased: false,
    });

    // Check if the cart item exists
    if (!cartItem) {
      return res.status(404).json(new APIError('Cart item not found or already purchased', 404));
    }

    if (productDetail && productDetail?.quantity < cartItem?.quantity) {
      return res
        .status(302)
        .json(new APIError(`There is Only ${productDetail?.quantity} Unit's Available now Sorry`, 302));
    }

    if (productDetail?.discount) {
      currentPrice = productDetail?.productPrice - productDetail?.productPrice / productDetail?.discount;
    } else {
      currentPrice = productDetail?.productPrice;
    }

    // Mark the cart item as purchased
    cartItem.isPurchased = true;

    cartItem.purchasedPrice = currentPrice;

    await productDetail.reduceProductQuantity(cartItem?.quantity);

    await cartItem.save();

    res.status(200).json(new APIResponse('Product purchased successfully', 200, cartItem));
  } catch (error: any) {
    console.error(error);
    res.status(500).json(new APIError(error?.message || 'Error While Product Purchase by Id', 500));
  }
});

const buyAllCartProducts = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const cartDetails = await CartModel.find({
      purchasedBy: userId,
      isPurchased: false,
    });

    if (!cartDetails) {
      return res.status(200).json(new APIResponse('Your Cart is Empty', 200, []));
    }

    for (let item of cartDetails) {
      let currentPrice: number = 0;

      const productDetail = await Product.findById(item?.productId);

      if (productDetail && productDetail?.quantity >= item?.quantity) {
        // Find the cart item by ID
        const cartItem = await CartModel.findOne({
          productId: productDetail?._id,
          purchasedBy: req.user?._id,
          isPurchased: false,
        });

        // Check if the cart item exists
        if (!cartItem) {
          return res.status(404).json(new APIError('Cart item not found or already purchased', 404));
        }

        if (productDetail?.discount) {
          currentPrice = productDetail?.productPrice - productDetail?.productPrice / productDetail?.discount;
        } else {
          currentPrice = productDetail?.productPrice;
        }

        // Mark the cart item as purchased
        cartItem.isPurchased = true;

        cartItem.purchasedPrice = currentPrice;

        await productDetail.reduceProductQuantity(cartItem?.quantity);

        await cartItem.save();
      }
    }

    res.status(200).json(new APIResponse('All Products Purchased Successfully', 200, []));
  } catch (error: any) {
    console.error(error);
    res.status(500).json(new APIError(error?.message || 'Internal server error', 500));
  }
});

const deleteCartItemById = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json(new APIError('Cart Item ID is required', 400));
    }

    const isCartItemExist = await CartModel.find({ productId: id, purchasedBy: req.user?._id });

    if (!isCartItemExist) {
      return res.status(302).json(new APIError('Requested Product Not Exist in Cart', 302));
    }

    if (isCartItemExist[0]?.isPurchased) {
      return res.status(402).json(new APIError("Product is Purchased now you Can't Delete", 402));
    }

    // Find and delete the cart item by ID
    const deletedCartItem = await CartModel.findByIdAndDelete(isCartItemExist[0]?._id);

    // Check if the cart item exists
    if (!deletedCartItem) {
      return res.status(404).json(new APIError('Cart item not found', 404));
    }

    res.status(200).json(new APIResponse('Cart item deleted successfully', 200, deleteCartItemById));
  } catch (error: any) {
    console.error(error);
    res.status(500).json(new APIError(error?.message || 'Error while deleting cart item', 500));
  }
});

const deleteEntireCart = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    // Delete all cart items belonging to the user
    const cart = await CartModel.deleteMany({ purchasedBy: userId, isPurchased: false });

    res.status(200).json(new APIResponse('Entire cart deleted successfully', 200, cart));
  } catch (error: any) {
    console.error(error);
    res.status(500).json(new APIError(error?.message || 'Error while deleting entire cart', 500));
  }
});

export { addProduct, getPurchasedProduct, buyProductById, buyAllCartProducts, deleteCartItemById, deleteEntireCart };
