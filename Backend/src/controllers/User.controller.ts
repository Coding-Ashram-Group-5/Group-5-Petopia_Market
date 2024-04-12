import { Request, Response } from 'express';
import UserModel from '../models/User.model.js';
import { APIError } from '../utils/APIError.util.js';
import { APIResponse } from '../utils/APIResponse.util.js';
import AsyncHandler from '../utils/AsyncHandler.util.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IGetUserAuthInfoRequest, TokenResponse } from '../types/model/user.type.js';

const generateToken = async (id: string): Promise<TokenResponse | APIError> => {
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return new APIError('User not found', 404);
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

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

    const isUserExist = await UserModel.findOne({ email }).select('-refreshToken');

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
        maxAge: 86400000, // 1 Days
      })
      .cookie('refreshToken', refreshToken, {
        maxAge: 1296000000, //15 Days
      })
      .json(new APIResponse('User Logged In Successfully', 200, loggedInUser));
  } catch (error) {
    console.log('Error in Login Controller', error);
  }
});

const registerUser = AsyncHandler(async (req: Request, res: Response) => {
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

    const createUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
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
        })
        .cookie('refreshToken', refreshToken, {
          maxAge: 2592000000,
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

const logoutUser = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const _id = (req as unknown as IGetUserAuthInfoRequest)?.user?.id;

    console.log(_id);

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

    console.log(id);

    if (!id) {
      return res.status(402).json(new APIError('Provide Necessary Parameters', 402));
    }

    const isUserExistWithId = await UserModel.findById(id);

    if (!isUserExistWithId) {
      return res.status(402).json(new APIError(`User Not Exist With ID : ${id}`, 402));
    }

    const isDeleted = await UserModel.findByIdAndDelete(id);

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
        .json(new APIResponse('User Logged In Successfully', 200, loggedInUser));
    } else {
      res.status(502).json(new APIError('Internal Server Error ENV Required', 502));
    }
  } catch (error: any) {
    console.log(error);
    res.status(502).json(new APIError(error?.message || 'Internal Server Error', 502));
  }
});

export { loginUser, registerUser, logoutUser, deleteAccount, refreshAccessToken };
