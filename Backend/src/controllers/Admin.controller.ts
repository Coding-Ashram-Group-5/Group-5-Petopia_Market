import UserModel from '../models/User.model.js';
import ProductModel from '../models/Product.model.js';
import PetModel from '../models/Pets.model.js';
import CartModel from '../models/Cart.model.js';
import { IGetUserAuthInfoRequest } from '../types/model/user.type.js';
import { APIError } from '../utils/APIError.util.js';
import AsyncHandler from '../utils/AsyncHandler.util.js';
import { Response } from 'express';
import fs from 'fs/promises';
import { APIResponse } from '../utils/APIResponse.util.js';

const adminPanelDetails = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  let { year, monthStart = 1, monthEnd = 12 } = req.body;

  year = +year;
  monthStart = +monthStart;
  monthEnd = +monthEnd;

  try {
    // Verify year is a valid number
    if (isNaN(year) || year < 1900 || year > 2100) {
      throw new APIError('Invalid year parameter', 400);
    }

    // Validate monthStart and monthEnd
    if (
      isNaN(monthStart) ||
      isNaN(monthEnd) ||
      monthStart < 1 ||
      monthEnd < 1 ||
      monthStart > 12 ||
      monthEnd > 12 ||
      monthStart > monthEnd
    ) {
      throw new APIError('Invalid month range parameters', 400);
    }

    // Construct the aggregation pipeline for users
    let aggregationPipelineUsers = [
      {
        $match: {
          created_at: {
            $gte: new Date(year, monthStart - 1, 1),
            $lt: new Date(year, monthEnd, 1),
          },
        },
      },
      {
        $count: 'total',
      },
    ];

    // Construct the aggregation pipeline for products
    let aggregationPipelineProducts = [
      {
        $match: {
          created_at: {
            $gte: new Date(year, monthStart - 1, 1),
            $lt: new Date(year, monthEnd, 1),
          },
        },
      },
      {
        $count: 'total',
      },
    ];

    // Construct the aggregation pipeline for all pets
    let aggregationPipelinePets = [
      {
        $match: {
          created_at: {
            $gte: new Date(year, monthStart - 1, 1),
            $lt: new Date(year, monthEnd, 1),
          },
        },
      },
      {
        $count: 'total',
      },
    ];

    // Construct the aggregation pipeline for adopted pets
    let aggregationPipelinePetsAdopted = [
      {
        $match: {
          created_at: {
            $gte: new Date(year, monthStart - 1, 1),
            $lt: new Date(year, monthEnd, 1),
          },
          isAdopted: true,
        },
      },
      {
        $count: 'total',
      },
    ];

    // Construct the aggregation pipeline for purchased products
    let aggregationPipelinePurchasedProducts = [
      {
        $match: {
          created_at: {
            $gte: new Date(year, monthStart - 1, 1),
            $lt: new Date(year, monthEnd, 1),
          },
          isPurchased: true,
        },
      },
      {
        $count: 'total',
      },
    ];

    // Run the aggregation pipelines to count new users, products, adopted pets, and purchased products
    const [resultUsers] = await UserModel.aggregate(aggregationPipelineUsers);
    const [resultProducts] = await ProductModel.aggregate(aggregationPipelineProducts);
    const [resultPets] = await PetModel.aggregate(aggregationPipelinePets);
    const [resultPetsAdopted] = await PetModel.aggregate(aggregationPipelinePetsAdopted);
    const [resultPurchasedProducts] = await CartModel.aggregate(aggregationPipelinePurchasedProducts);

    // Fetch total counts
    const totalUsers = await UserModel.countDocuments();
    const totalProducts = await ProductModel.countDocuments();
    const totalPets = await PetModel.countDocuments();

    // Extract counts from aggregation results or default to 0
    const totalNewUsers = resultUsers ? resultUsers.total : 0;
    const totalNewProducts = resultProducts ? resultProducts.total : 0;
    const totalNewPets = resultPets ? resultPets.total : 0;
    const totalNewPetsAdopted = resultPetsAdopted ? resultPetsAdopted.total : 0;
    const totalPurchasedProducts = resultPurchasedProducts ? resultPurchasedProducts.total : 0;

    // visitors count
    const data = await fs.readFile(countFile, 'utf8');
    const visitCount = JSON.parse(data).count;

    res.status(200).send({
      totalUsers,
      totalNewUsers,
      totalProducts,
      totalNewProducts,
      totalPets,
      totalNewPets,
      totalNewPetsAdopted,
      totalPurchasedProducts,
      visitCount,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json(new APIError(error?.message || 'Bad Request', 400));
  }
});

let visitCount = 0;
const countFile = './public/visitCount.json';

// Middleware to load initial count from file
export async function loadCount() {
  try {
    const data = await fs.readFile(countFile, 'utf8');
    visitCount = JSON.parse(data).count;
    console.log('Initial visit count:', visitCount);
  } catch (err: any) {
    console.error('Error loading visit count:', err);
  }
}

// Save count to file function
export const saveCount = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    await fs.writeFile(countFile, JSON.stringify({ count: visitCount }), 'utf8');
    console.log('Visit count saved:', visitCount);

    res.status(200).json(new APIResponse('Total Visit Count', 200, visitCount));
  } catch (err: any) {
    console.error('Error saving visit count:', err);
    res.status(502).json(new APIError(err?.message || 'Internal Server Error', 502));
  }
});

export const getAllUsers = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userList = await UserModel.aggregate([
      {
        $lookup: {
          from: 'pets',
          foreignField: 'owner',
          localField: '_id',
          as: 'pets_details',
        },
      },
      {
        $lookup: {
          from: 'products',
          foreignField: 'creator',
          localField: '_id',
          as: 'product_details',
        },
      },
      {
        $lookup: {
          from: 'blogs',
          foreignField: 'owner',
          localField: '_id',
          as: 'blog_details',
        },
      },
      {
        $lookup: {
          from: 'carts',
          foreignField: 'purchasedBy',
          localField: '_id',
          as: 'cart_details',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          pets_details: 1,
          product_details: 1,
          blog_details: 1,
          cart_details: 1,
          pets_count: { $size: '$pets_details' },
          products_count: { $size: '$product_details' },
          blogs_count: { $size: '$blog_details' },
          carts_count: { $size: '$cart_details' },
        },
      },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: '_id',
          as: 'user_details',
        },
      },
      { $unwind: '$user_details' },
      {
        $replaceRoot: { newRoot: { $mergeObjects: ['$$ROOT', '$user_details'] } },
      },
    ]);
    res.status(200).json(new APIResponse('All Available User List', 200, userList));
  } catch (error: any) {
    console.log(error);
    res.status(502).json(new APIError(error?.message || 'Internal Server Error', 502));
  }
});

export default adminPanelDetails;
