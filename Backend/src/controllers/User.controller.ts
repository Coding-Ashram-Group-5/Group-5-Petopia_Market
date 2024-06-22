import { Request, Response } from 'express';
import UserModel from '../models/User.model.js';
import { APIError } from '../utils/APIError.util.js';
import { APIResponse } from '../utils/APIResponse.util.js';
import AsyncHandler from '../utils/AsyncHandler.util.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CloudinaryImage, IGetUserAuthInfoRequest, TokenResponse } from '../types/model/user.type.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.util.js';

// Cookies options
const cookiesOptions = {
  secure: process.env.NODE_ENV == 'production',
  httpOnly: true,
  sameSite: 'none' as 'none',
};

const generateToken = async (id: string): Promise<TokenResponse | APIError> => {
  try {
    const user = await UserModel.findById(id).select('+password');

    if (!user) {
      return new APIError('User not found', 404);
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    return new APIError('Error While Generating Token', 502);
  }
};

const loginUser = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).json(new APIError('All Fields are Required', 402));
    }

    const isUserExist = await UserModel.findOne({ email }).select('-refreshToken +password');

    if (!isUserExist) {
      return res.status(402).json(new APIError('User Not Exist', 402));
    }

    const isPasswordCorrect = await isUserExist.ComparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(402).json(new APIError('Invalid User Credentials', 402));
    }

    const loggedInUser = await UserModel.findById(isUserExist?._id).select(
      '-password -refreshToken -created_at -updated_at -__v',
    );

    const { accessToken, refreshToken } = (await generateToken(isUserExist?._id)) as TokenResponse;

    res
      .status(200)
      .cookie('authToken', accessToken, {
        maxAge: 86400000, // 1 Day
        ...cookiesOptions,
      })
      .cookie('refreshToken', refreshToken, {
        maxAge: 1296000000, // 15 Days
        ...cookiesOptions,
      })
      .json(new APIResponse('User Logged In Successfully', 200, loggedInUser));
  } catch (error: any) {
    console.log('Error in Login Controller', error);
    return res.status(502).json(new APIError(error?.message || 'Internal Server Error', 502));
  }
});

const registerUser = AsyncHandler(async (req: Request, res: Response) => {
  let avatar: CloudinaryImage = {
    publicId: '',
    url: '',
  };

  try {
    const { firstName, lastName, email, password } = req.body;

    if ([firstName, email, password].some((attr) => attr?.trim() === '')) {
      return res.status(402).json(new APIError('Required Fields are Missing', 402));
    }

    const isUserExist = await UserModel.findOne({
      email,
    });

    if (isUserExist) {
      return res.status(402).json(new APIError('User Already Exist With Provided Email', 402));
    }

    if (password.length < 6) {
      return res.status(402).json(new APIError('Password Must be 8 Character Long', 402));
    }

    const imagelocalPath = req.file?.path;

    if (imagelocalPath) {
      const res = await uploadOnCloudinary(imagelocalPath);
      avatar.url = res ? res?.url : '';
      avatar.publicId = res ? res?.public_id : '';
    }

    const createUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      avatar: avatar,
    });

    const isUserCreated = await UserModel.findById({ _id: createUser._id }).select(
      '-password -refreshToken -created_at -updated_at -__v',
    );

    if (isUserCreated) {
      const { accessToken, refreshToken } = (await generateToken(isUserCreated?._id)) as TokenResponse;

      res
        .status(200)
        .cookie('authToken', accessToken, {
          maxAge: 604800000,
          ...cookiesOptions,
        })
        .cookie('refreshToken', refreshToken, {
          maxAge: 2592000000,
          ...cookiesOptions,
        })
        .json(new APIResponse('User Created Successfully', 200, isUserCreated));
    } else {
      res.status(502).json(new APIError('Failed to Create User', 502));
    }
  } catch (error: any) {
    console.log(error);
    return res.status(502).json(new APIError(error?.message || 'Internal Server Error', 502));
  }
});

const logoutUser = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const _id = req.user?._id;

    if (!_id) {
      throw new Error('User ID is missing');
    }

    await UserModel.findByIdAndUpdate(
      { _id },
      {
        $unset: {
          refreshToken: '',
        },
      },
      {
        new: true,
      },
    );

    res
      .status(200)
      .clearCookie('authToken')
      .json(new APIResponse('User Logged Out Successfully', 200, []));
  } catch (error) {
    console.log(error);
  }
});

const deleteAccount = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(402).json(new APIError('Provide Necessary Parameters', 402));
    }

    const isUserExistWithId = await UserModel.findById(id);

    if (!isUserExistWithId) {
      return res.status(402).json(new APIError(`User Not Exist With ID : ${id}`, 402));
    }

    await isUserExistWithId.deleteAvatar();

    const isDeleted = await UserModel.findOneAndDelete({ _id: id });

    if (!isDeleted) {
      return res.status(502).json(new APIError('Failed to Delete Account', 502));
    }

    res.status(200).json(new APIResponse('Account Deleted Successfully', 200, isDeleted));
  } catch (error) {
    console.log(error);
    res.status(502).json(new APIError('Failed to Delete Account', 502));
  }
});

const refreshAccessToken = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

    if (!token) {
      return res.status(402).json(new APIError('Refresh Token Required', 402));
    }

    if (REFRESH_TOKEN_SECRET) {
      const decodeToken = jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;

      if (!decodeToken?._id) {
        return res.status(402).json(new APIError('Invalid or Expired Refresh Token', 402));
      }

      const isUserExist = await UserModel.findById(decodeToken?._id);

      if (!isUserExist) {
        return res.status(402).json(new APIError('Invalid or Expired Refresh Token', 402));
      }

      const loggedInUser = await UserModel.findById(isUserExist?._id).select(
        '-password -refreshToken -created_at -updated_at -__v',
      );

      const { accessToken, refreshToken } = (await generateToken(isUserExist?._id)) as TokenResponse;

      res
        .status(200)
        .cookie('authToken', accessToken, {
          maxAge: 604800000, // 7 Days
        })
        .cookie('refreshToken', refreshToken, {
          maxAge: 2592000000, //30 Days
        })
        .json(new APIResponse('Access Token Refreshed', 200, loggedInUser));
    } else {
      res.status(502).json(new APIError('Internal Server Error ENV Required', 502));
    }
  } catch (error: any) {
    console.log(error);
    res.status(502).json(new APIError(error?.message || 'Internal Server Error', 502));
  }
});

const getProfileDetails = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userDetails = await UserModel.findById(req.user?._id).select('-refreshToken');

    if (!userDetails) {
      return res.status(302).json(new APIError('No User Found Sorry', 302));
    }

    res.status(200).json(new APIResponse(`Hey ${userDetails?.firstName} Here Your Profile Data`, 200, userDetails));
  } catch (error: any) {
    console.log(error);
    res.status(502).json(new APIError(error?.message || 'Internal Server Error', 502));
  }
});

const updateProfileDetails = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  let avatar: CloudinaryImage = {
    publicId: '',
    url: '',
  };

  try {
    const { firstName, lastName, email, password } = req.body;

    if ([firstName, email, password].some((attr) => attr?.trim() === '')) {
      return res.status(402).json(new APIError('Required Fields are Missing', 402));
    }

    const isUserExist = await UserModel.findOne({
      email,
    });

    if (!isUserExist) {
      return res.status(402).json(new APIError('User Not Exist', 402));
    }

    if (password.length < 8) {
      return res.status(402).json(new APIError('Password Must be 8 Character Long', 402));
    }

    const imagelocalPath = req.file?.path;

    if (imagelocalPath) {
      const res = await uploadOnCloudinary(imagelocalPath);
      avatar.url = res ? res?.secure_url : '';
      avatar.publicId = res ? res?.public_id : '';
    } else {
      if (isUserExist?.avatar) avatar = isUserExist?.avatar;
    }

    const updateUser = await UserModel.findById(req.user?._id, {
      firstName,
      lastName,
      email,
      password,
      avatar,
    });

    res.status(200).json(new APIResponse('User Details Updated Successfully', 200, updateUser));
  } catch (error: any) {
    console.log(error);
    res.status(502).json(new APIError(error?.message || 'Internal Server Error', 502));
  }
});

const getAllUsers = AsyncHandler(async (req: Request, res: Response) => {
  try {
    let usersList = await UserModel.find({});

    res.status(200).json(new APIResponse('All Available User List', 200, usersList));
  } catch (error: any) {
    console.log(error);
    res.status(502).json(new APIError(error?.message || 'Internal Server Error', 502));
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  deleteAccount,
  refreshAccessToken,
  getProfileDetails,
  updateProfileDetails,
  getAllUsers,
};
