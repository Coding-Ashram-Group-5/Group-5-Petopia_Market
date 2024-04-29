import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User.model.js';
import { IUser } from '../types/model/user.type.js';
import { APIError } from '../utils/APIError.util.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AsyncHandler from '../utils/AsyncHandler.util.js';

interface AuthRequest extends Request {
  user?: IUser; // Define the user property
}

export const isAuthenticate = AsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    if (req.cookies && req.cookies.authToken) {
      token = req.cookies.authToken;
    } else if (req.headers && req.headers.authorization && typeof req.headers.authorization === 'string') {
      token = req.headers.authorization.replace('Bearer ', '');
    } else if (req.body && typeof req.body.token === 'string') {
      token = req.body.token;
    }

    if (!token) {
      throw new APIError('Unauthorized Request', 402);
    }
    if (process.env.ACCESS_TOKEN_SECRET) {
      const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;

      const userData = await UserModel.findById(decodeToken._id).select('-password -refreshToken');

      if (!userData) {
        throw new APIError('Invalid Access Token', 402);
      }

      req.user = userData;

      next();
    }
  } catch (error: any) {
    console.log(error);
    throw new APIError(error?.message || 'Internal Server Error', 502);
  }
});
