import PetModel from '../models/Pets.model.js';
import UserModel from '../models/User.model.js';

import { APIError } from '../utils/APIError.util.js';
import { APIResponse } from '../utils/APIResponse.util.js';
import AsyncHandler from '../utils/AsyncHandler.util.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.util.js';
import { CloudinaryImage, IGetUserAuthInfoRequest } from '../types/model/user.type.js';
import { RequestHandler, Response, Request } from 'express';
import mongoose from 'mongoose';

// This Controller add's Detail of Pet in Pet Controller
const addPet = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  const petImage: CloudinaryImage[] = [];
  try {
    const { petName, petDescription, price, isFree, petType, petBread, diseases } = req.body;

    // checking for required fields
    if ([petName, petBread, petDescription, price, petType].some((val) => val?.trim() === '')) {
      return res.status(402).json(new APIError('Required Fields are Missing', 402));
    }

    const petImages = req.files;

    // Checking Condition for Minimum one Image is Required
    if (!petImages || !Array.isArray(petImages) || petImages.length < 1) {
      return res.status(402).json(new APIError('At Least one Image of Pet is Required', 402));
    }

    // Iterating over each uploaded file and uploading them to Cloudinary
    for (const file of petImages) {
      const localPath: string = file?.path;
      const response = await uploadOnCloudinary(localPath);
      if (response?.secure_url) {
        petImage.push({ url: response.secure_url, publicId: response.public_id });
      }
    }

    const addNewPet = await PetModel.create({
      petName,
      petDescription,
      price,
      isFree,
      petType,
      petBread,
      petImages: petImage,
      diseases,
      owner: req.user?._id,
    });

    if (!addNewPet) {
      return res.status(501).json(new APIError('Failed to Add Pet', 501));
    }

    res.status(200).json(new APIResponse('Pet Details Added Successfully', 200, addNewPet));
  } catch (error: any) {
    console.log(error?.message || 'Errro while Adding Pet');
    res.status(502).json(new APIError(error?.message, 502, error));
  }
});

// This Controller Retrieve all Pets Details
const getAllPets = AsyncHandler(async (_, res: Response) => {
  try {
    // Retrieve all Available Pets

    // const pets = await PetModel.find();
    const pets = await PetModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'userData',
        },
      },
      { $unset: ['owner', '__v', 'userData.password', 'userData.__v', 'userData.refreshToken'] },
      {
        $unwind: '$userData',
      },
    ]);

    res.status(200).json(new APIResponse('All Pets Retrieved Successfully', 200, pets));
  } catch (error: any) {
    console.log('Error while retrieving pets:', error.message);
    res.status(500).json(new APIError('Failed to retrieve pets', 500, error));
  }
});

// This Controller helps to get Pet Details by Id
const getPetById: RequestHandler = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Checking Availability of id in params
    if (!id) {
      return res.status(402).json(new APIError('Parameter id is Missing', 402));
    }

    // const pet = await PetModel.findById(id);
    // Here Type Conversion is Required because findById handles it automatically
    const objectId = new mongoose.Types.ObjectId(id);

    const pet = await PetModel.aggregate([
      {
        $match: { _id: objectId },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'userData',
        },
      },
      { $unset: ['owner', '__v', 'userData.password', 'userData.__v', 'userData.refreshToken'] },
      {
        $unwind: '$userData',
      },
    ]);

    if (!pet) {
      return res.status(404).json(new APIError('Pet not found', 404));
    }

    res.status(200).json(new APIResponse('Pet Retrieved Successfully', 200, pet));
  } catch (error: any) {
    console.log('Error while retrieving pet by ID:', error.message);
    res.status(500).json(new APIError('Failed to retrieve pet', 500, error));
  }
});

// This Controller Delete Pet Details by id
const deletePetById = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(402).json(new APIError('Parameter id is Missing', 402));
    }
    const petDetails = await PetModel.findById(id);

    if (!petDetails) {
      return res.status(402).json(new APIError(`No Pet Found with Given Parameter Id:${id}`, 402));
    }

    // Checking for condition of Only Owner Can Delete Product
    if (req.user && String(petDetails.owner) != req.user._id) {
      return res.status(402).json(new APIError('Only Owner can Delete Product', 402));
    }

    await petDetails.deleteImages();

    const deletedPet = await PetModel.findByIdAndDelete(id);

    if (!deletedPet) {
      return res.status(404).json(new APIError('Pet not found', 404));
    }

    res.status(200).json(new APIResponse('Pet Deleted Successfully', 200, deletedPet));
  } catch (error: any) {
    console.log('Error while deleting pet by ID:', error.message);
    res.status(500).json(new APIError('Failed to delete pet', 500, error));
  }
});

// This controller Help's to Edit Details of Pet
const updatePetDetails = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  let petsImageUrl: CloudinaryImage[] = [];
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(402).json(new APIError('Parameter id is Missing', 402));
    }

    const { petName, petDescription, price, isFree, petType, petBread, diseases } = req.body;

    const petDetails = await PetModel.findById(id);

    if (!petDetails) {
      return res.status(402).json(new APIError('Pet Not Exist with given Id', 402));
    }

    // Checking for condition of Only Owner Can Edit Details of Pet
    if (petDetails && req.user && String(petDetails.owner) != req.user._id) {
      return res.status(402).json(new APIError('only Owner can Edit Pet Details', 402));
    }

    // Basic validation checks
    if (!petName || !petDescription || !price || !petType) {
      return res.status(400).json(new APIError('Missing required fields', 400));
    }

    const petImages = req.files;

    // if Images are altered then and then only updating image
    if (petImages && Array.isArray(petImages)) {
      // Iterating over each uploaded file and uploading them to Cloudinary
      for (const file of petImages) {
        const localPath: string = file?.path;
        const response = await uploadOnCloudinary(localPath);
        if (response?.secure_url) {
          petsImageUrl.push({ url: response.secure_url, publicId: response.public_id });
        }
      }
    }

    if (petsImageUrl.length < 1 && petDetails?.petImages) {
      petsImageUrl = petDetails?.petImages;
    }

    const updatedPet = await PetModel.findByIdAndUpdate(
      id,
      {
        petName,
        petDescription,
        price,
        isFree,
        petType,
        petBread,
        diseases,
        petImages: petsImageUrl,
      },
      { new: true },
    );

    if (!updatedPet) {
      return res.status(404).json(new APIError('Pet Update Failed', 502));
    }

    res.status(200).json(new APIResponse('Pet Details Updated Successfully', 200, updatedPet));
  } catch (error: any) {
    console.log('Error while updating pet details:', error.message);
    res.status(500).json(new APIError('Failed to update pet details', 500, error));
  }
});

// Following Controller change Status of Pet is Adopted or not?
const buyPet = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { zipcode, street, city, phoneNumber } = req.body;

    // Validate Zip Code
    if (!zipcode.trim().match(/^[1-9][0-9]{5}$/)) {
      return res.status(402).json(new APIError('Please Provide Valid Zip Code Value', 402));
    }

    // Validate Mobile Number
    if (!phoneNumber.trim().match(/^\d{10}$/)) {
      return res.status(402).json(new APIError('Please Provide Valid Mobile Number', 402));
    }

    await UserModel.findByIdAndUpdate(req.user?._id, {
      details: {
        street,
        zipcode: +zipcode,
        phoneNumber: +phoneNumber,
        city,
      },
    });

    const PetDetails = await PetModel.findById(id);

    // Checking Existence of Pet Details
    if (!PetDetails) {
      return res.status(402).json(new APIError("Pet with Provided Details Doesn't Exist", 402));
    }

    // Checking Condition of Pet Owner can't Adopt his own Pet
    if (PetDetails && req.user && String(PetDetails.owner) == req.user._id) {
      return res.status(402).json(new APIError("You Can't Adopt Your own Pet", 402));
    }

    const updatePetAdoptStatus = await PetModel.findByIdAndUpdate(id, { isAdopted: true });

    // Checking if any server side issue in update status
    if (!updatePetAdoptStatus) {
      return res.status(502).json(new APIError('Failed to Update the Status of Pet Adoption Sorry', 502));
    }

    res.status(200).json(new APIResponse('Pet is Adopted Successfully', 200, updatePetAdoptStatus));
  } catch (error: any) {
    console.log(error);
    res.status(500).json(new APIError('Failed to update pet details', 500, error));
  }
});

const getAdoptedPet = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(402).json(new APIError('Parameter id is Missing', 402));
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const adoptedPet = await PetModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'userData',
        },
      },
      {
        $match: { isAdopted: true, 'userData._id': objectId },
      },
      { $unset: ['owner', '__v', 'userData.password', 'userData.__v', 'userData.refreshToken'] },

      {
        $unwind: '$userData',
      },
    ]);

    res
      .status(200)
      .json(
        new APIResponse(`Here\'s the List of Adopted Pet by ${adoptedPet[0]?.userData?.firstName}`, 200, adoptedPet),
      );
  } catch (error: any) {
    console.log(error);
    res.status(500).json(new APIError('Failed to update pet details', 500, error));
  }
});

export { addPet, getAllPets, getPetById, deletePetById, updatePetDetails, buyPet, getAdoptedPet };
