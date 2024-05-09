import ProductModel from '../models/Product.model.js';

import { Request, Response } from 'express';
import { APIError } from '../utils/APIError.util.js';
import { APIResponse } from '../utils/APIResponse.util.js';

import AsyncHandler from '../utils/AsyncHandler.util.js';
import { CloudinaryImage, IGetUserAuthInfoRequest } from '../types/model/user.type.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.util.js';
import mongoose, { ObjectId } from 'mongoose';

// Retrieve All Product Details for Display
const getAllProduct = AsyncHandler(async (req: Request, res: Response) => {
  try {
    let { limit = 10 } = req.params;
    limit = +limit;

    const products = await ProductModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'userData',
        },
      },
      { $unset: ['creator', '__v', 'userData.password', 'userData.__v', 'userData.refreshToken'] },
      {
        $unwind: '$userData',
      },
    ])
      .sort('createdAt')
      .limit(limit);
    res.status(200).json(new APIResponse('Product Details', 200, products));
  } catch (error: any) {
    console.log(error);
    return res.status(502).json(new APIError(error?.message || 'Error While Fetching All Product Details', 502));
  }
});

// Adding Product Controller
const addProduct = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  const productImage: CloudinaryImage[] = [];

  try {
    let { productName, productDescription, productPrice, discount, quantity, category } = req.body;

    // if checking for Required for Fields
    if ([productName, productDescription, productPrice, quantity, category].some((val) => val?.trim() === '')) {
      return res.status(402).json(new APIError('All Fields are Required', 402));
    }

    discount = +discount;
    quantity = +quantity;

    // checking for basic validation for discount quantity
    if (discount && (discount < 0 || discount > 100)) {
      return res.status(402).json(new APIError('Discount must be less than 100 or greater than 0', 402));
    }

    if (quantity && quantity < 0) {
      return res.status(402).json(new APIError('Please Provide Valid Value for Quantity', 402));
    }

    const productImages = req.files;

    // Checking Condition for Minimum one Image is Required
    if (!productImages || !Array.isArray(productImages) || productImages.length < 1) {
      return res.status(402).json(new APIError('At Least one Image of Pet is Required', 402));
    }

    // Iterating over each uploaded file and uploading them to Cloudinary
    for (const file of productImages) {
      const localPath: string = file?.path;
      const response = await uploadOnCloudinary(localPath);
      if (response?.secure_url) {
        productImage.push({ url: response.secure_url, publicId: response.public_id });
      }
    }

    const product = await ProductModel.create({
      productName,
      productDescription,
      discount,
      category: category.split(','),
      productPrice,
      quantity,
      productImages: productImage,
      creator: req.user?._id,
    });

    if (!product) {
      return res.status(502).json(new APIError('Failed to Create Product', 502));
    }

    res.status(200).json(new APIResponse('Product Added Successfully', 200, product));
  } catch (error: any) {
    console.log(error);
    return res.status(502).json(new APIError(error?.message || 'Error while Adding Product', 502));
  }
});

// Delete Product by Id
const deleteProductById = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Checking for availability of parameter id
    if (!id) {
      return res.status(402).json(new APIError('Parameter Missing Required ID Parameter', 402));
    }

    const productDetail = await ProductModel.findById(id);

    // checking existence of Product
    if (!productDetail) {
      return res.status(402).json(new APIError(`Product with Id : ${id} Doesn't Exist`, 402));
    }

    // Checking for condition of Only Owner Can Delete Product
    if (req.user && String(productDetail.creator) != req.user._id) {
      return res.status(402).json(new APIError('Only Owner can Delete Product', 402));
    }

    await productDetail.deleteImages();

    const deleteProduct = await ProductModel.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).json(new APIError('Failed to Delte Product', 404));
    }

    res.status(200).json(new APIResponse('Product Deleted Successfully', 200, deleteProduct));
  } catch (error: any) {
    console.log(error);
    return res.status(502).json(new APIError(error?.message || 'Error while Delete Product by ID', 502));
  }
});

// Update Product Delete
const editProduct = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  let productImageDetails: CloudinaryImage[] = [];

  try {
    const { id } = req.params;
    let { productName, productDescription, productPrice, discount, quantity, category } = req.body;

    // Checking for availability of parameter id
    if (!id) {
      return res.status(402).json(new APIError('Parameter Missing Required ID Parameter', 402));
    }

    const productDetail = await ProductModel.findById(id);

    // checking existence of Product
    if (!productDetail) {
      return res.status(402).json(new APIError(`Product with Id : ${id} Doesn't Exist`, 402));
    }

    // Checking for condition of Only Owner Can Delete Product
    if (req.user && String(productDetail.creator) != req.user._id) {
      return res.status(402).json(new APIError('Only Owner can Update Product Details', 402));
    }

    // if checking for Required for Fields
    if ([productName, productDescription, productPrice, quantity, category].some((val) => val?.trim() === '')) {
      return res.status(402).json(new APIError('All Fields are Required', 402));
    }

    discount = +discount;
    quantity = +quantity;

    // checking for basic validation for discount quantity
    if (discount && (discount < 0 || discount > 100)) {
      return res.status(402).json(new APIError('Discount must be less than 100 or greater than 0', 402));
    }

    if (quantity && quantity < 0) {
      return res.status(402).json(new APIError('Please Provide Valid Value for Quantity', 402));
    }

    const productImage = req.files;

    // if Images are altered then and then only updating image
    if (productImage && Array.isArray(productImage)) {
      // Iterating over each uploaded file and uploading them to Cloudinary
      for (const file of productImage) {
        const localPath: string = file?.path;
        const response = await uploadOnCloudinary(localPath);
        if (response?.secure_url) {
          productImageDetails.push({ url: response.secure_url, publicId: response.public_id });
        }
      }
    }

    if (productImageDetails.length < 1 && productDetail?.productImages) {
      productImageDetails = productDetail?.productImages;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        productName,
        productDescription,
        productPrice,
        productImages: productImageDetails,
        discount,
        quantity,
        category: category.split(','),
      },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json(new APIError('ProductUpdate Failed', 502));
    }

    res.status(200).json(new APIResponse('Product Details Updated Successfully', 200, updatedProduct));
  } catch (error: any) {
    console.log(error);
    return res.status(502).json(new APIError(error?.message || 'Error while Edit Product by ID', 502));
  }
});

//Product Details by Id
const getProductById = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Checking for availability of parameter id
    if (!id) {
      return res.status(402).json(new APIError('Parameter Missing Required ID Parameter', 402));
    }

    //!   const productDetail = await ProductModel.findById(id);
    // Type Casting for Comparison
    const objectId = new mongoose.Types.ObjectId(id);

    const productDetail = await ProductModel.aggregate([
      {
        $match: { _id: objectId },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'userData',
        },
      },
      { $unset: ['creator', '__v', 'userData.password', 'userData.__v', 'userData.refreshToken'] },
      {
        $unwind: '$userData',
      },
    ]);

    // checking existence of Product
    if (!productDetail) {
      return res.status(402).json(new APIError(`Product with Id : ${id} Doesn't Exist`, 402));
    }

    res.status(200).json(new APIResponse('Product Details', 200, productDetail));
  } catch (error: any) {
    console.log(error);
    return res.status(502).json(new APIError(error?.message || 'Error while Get Product by ID', 502));
  }
});

const addRatingofProduct = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    let { id, rating = 0 } = req.params;

    rating = +rating;

    if (!id || !rating) {
      return res.status(402).json(new APIError('Required Parameter ID and Rating are Missing', 402));
    }

    if (rating > 5 || rating < 0) {
      return res.status(402).json(new APIError(`Please Provide Valid Value for Rating instead of ${rating}`, 402));
    }

    const productDetails = await ProductModel.findById(id);

    if (!productDetails) {
      return res.status(302).json(new APIError(`Product with id ${id} Doesn't Exist`, 302));
    }

    if (String(productDetails.creator) == req.user?._id) {
      return res.status(302).json(new APIError("Owner Can't Add Rating", 302));
    }

    if (productDetails?.ratings.some((rating) => String(rating?.userId) == req?.user?._id)) {
      return res.status(302).json(new APIError('Your Rating is Already Noted', 302));
    }
    const isRatingAdded = req.user?._id && (await productDetails.addRating(req.user?._id, rating));

    console.log(isRatingAdded);

    if (!isRatingAdded) return res.status(502).json(new APIError('Failed to Added Rating', 502));

    res.status(200).json(new APIResponse('Rating Added Successfully', 200, isRatingAdded));
  } catch (error: any) {
    console.log(error);
    return res.status(502).json(new APIError(error?.message || 'Error while Adding Product Rating by ID', 502));
  }
});

const alterProductRating = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id, rating } = req.params;

    // Convert rating to a number
    const newRating = +rating;

    // Check if required parameters are provided
    if (!id || !newRating) {
      return res.status(402).json(new APIError('Required parameters ID and Rating are missing', 402));
    }

    // Check if the provided rating is within a valid range
    if (newRating > 5 || newRating < 0) {
      return res
        .status(402)
        .json(new APIError(`Please provide a valid rating between 0 and 5 instead of ${newRating}`, 402));
    }

    // Find the product by ID
    const productDetails = await ProductModel.findById(id);

    // Check if the product exists
    if (!productDetails) {
      return res.status(404).json(new APIError(`Product with ID ${id} doesn't exist`, 404));
    }

    // Check if the user is the owner of the product
    if (String(productDetails.creator) === req.user?._id) {
      return res.status(403).json(new APIError("Owner can't alter the rating", 403));
    }

    // Check if the user has already rated the product
    const existingRatingIndex = productDetails.ratings.findIndex((rating) => String(rating?.userId) == req.user?._id);

    // If user has not rated the product, return an error
    if (existingRatingIndex === -1) {
      return res.status(403).json(new APIError("You haven't rated this product yet", 403));
    }

    // Update the rating
    productDetails.ratings[existingRatingIndex].rating = newRating;

    // Save the updated product
    await productDetails.save();

    res.status(200).json(new APIResponse('Product rating updated successfully', 200, productDetails));
  } catch (error: any) {
    console.log(error);
    return res.status(502).json(new APIError(error?.message || 'Error while updating product rating by ID', 502));
  }
});

export {
  addProduct,
  getAllProduct,
  deleteProductById,
  editProduct,
  getProductById,
  addRatingofProduct,
  alterProductRating,
};
