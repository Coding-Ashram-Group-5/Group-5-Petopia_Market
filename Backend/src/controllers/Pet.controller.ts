import Pets from '../models/Pets.model.js';
import { APIError } from '../utils/APIError.util.js';
import { APIResponse } from '../utils/APIResponse.util.js';
import AsyncHandler from '../utils/AsyncHandler.util.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.util.js';
import { IGetUserAuthInfoRequest } from '../types/model/user.type.js';
import { RequestHandler, Response, Request } from 'express';

const addPet = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  const petImageURL: string[] = [];
  try {
    const { petName, petDescription, price, isFree, petType, petBread, diseases } = req.body;

    // checking for required fields
    if ([petName, petBread, petDescription, price, petType].some((val) => val?.trim() === '')) {
      return res.status(402).json(new APIError('Required Fields are Missing', 402));
    }

    const petImages = req.files;

    if (!petImages || !Array.isArray(petImages) || petImages.length < 1) {
      return res.status(402).json(new APIError('At Least one Image of Pet is Required', 402));
    }

    // Iterating over each uploaded file and uploading them to Cloudinary
    for (const file of petImages) {
      const localPath: string = file?.path;
      const response = await uploadOnCloudinary(localPath);
      if (response?.url) {
        petImageURL.push(response.url);
      }
    }

    const addNewPet = await Pets.create({
      petName,
      petDescription,
      price,
      isFree,
      petType,
      petBread,
      petImages: petImageURL,
      diseases,
      owner: req.user?._id,
    });

    if (!addNewPet) {
      return res.status(501).json(new APIError('Failed to Add Pet', 501));
    }

    res.status(200).json(new APIResponse('Pet Details Added Successfully', 200, addNewPet));
  } catch (error: any) {
    console.log('Errro while Adding Pet');
    res.status(502).json(new APIError(error?.message, 502, error));
  }
});

const getAllPets = AsyncHandler(async (_, res: Response) => {
  try {
    const pets = await Pets.find();
    res.status(200).json(new APIResponse('All Pets Retrieved Successfully', 200, pets));
  } catch (error: any) {
    console.log('Error while retrieving pets:', error.message);
    res.status(500).json(new APIError('Failed to retrieve pets', 500, error));
  }
});

const getPetById: RequestHandler = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(402).json(new APIError('Parameter id is Missing', 402));
    }

    const pet = await Pets.findById(id);

    if (!pet) {
      return res.status(404).json(new APIError('Pet not found', 404));
    }

    res.status(200).json(new APIResponse('Pet Retrieved Successfully', 200, pet));
  } catch (error: any) {
    console.log('Error while retrieving pet by ID:', error.message);
    res.status(500).json(new APIError('Failed to retrieve pet', 500, error));
  }
});

const deletePetById = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(402).json(new APIError('Parameter id is Missing', 402));
    }

    const deletedPet = await Pets.findByIdAndDelete(id);

    if (!deletedPet) {
      return res.status(404).json(new APIError('Pet not found', 404));
    }

    res.status(200).json(new APIResponse('Pet Deleted Successfully', 200, deletedPet));
  } catch (error: any) {
    console.log('Error while deleting pet by ID:', error.message);
    res.status(500).json(new APIError('Failed to delete pet', 500, error));
  }
});

const updatePetDetails = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  let petsImageUrl: string[] = [];
  try {
    const { petName, petDescription, price, isFree, petType, petBreed, diseases } = req.body;
    const { id } = req.params;

    const petDetails = await Pets.findById(id);

    if (!petDetails) {
      return res.status(402).json(new APIError('Pet Not Exist with given Id', 402));
    }

    if (petDetails && req.user && String(petDetails.owner) != req.user._id) {
      return res.status(402).json(new APIError('You are Not owner of this Pet', 402));
    }

    if (!id) {
      return res.status(402).json(new APIError('Parameter id is Missing', 402));
    }

    // Basic validation checks
    if (!petName || !petDescription || !price || !petType) {
      return res.status(400).json(new APIError('Missing required fields', 400));
    }

    const petImages = req.files;

    if (petImages && Array.isArray(petImages)) {
      // Iterating over each uploaded file and uploading them to Cloudinary
      for (const file of petImages) {
        const localPath: string = file?.path;
        const response = await uploadOnCloudinary(localPath);
        if (response?.url) {
          petsImageUrl.push(response.url);
        }
      }
    }

    if (petsImageUrl.length < 1 && petDetails?.petImages) {
      petsImageUrl = petDetails?.petImages;
    }

    const updatedPet = await Pets.findByIdAndUpdate(
      id,
      {
        petName,
        petDescription,
        price,
        isFree,
        petType,
        petBreed,
        diseases,
        petImages: petsImageUrl,
      },
      { new: true },
    );

    if (!updatedPet) {
      return res.status(404).json(new APIError('Pet Update Failed', 404));
    }

    res.status(200).json(new APIResponse('Pet Details Updated Successfully', 200, updatedPet));
  } catch (error: any) {
    console.log('Error while updating pet details:', error.message);
    res.status(500).json(new APIError('Failed to update pet details', 500, error));
  }
});

export { addPet, getAllPets, getPetById, deletePetById, updatePetDetails };
