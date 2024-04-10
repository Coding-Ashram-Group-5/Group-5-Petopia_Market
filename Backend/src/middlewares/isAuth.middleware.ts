import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User.model';
import { User } from '../types/model/user.type';
import { APIError } from '../utils/APIError.util';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AsyncHandler from '../utils/AsyncHandler.util';
import randomString from '../utils/randomSecret.util';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

interface AuthRequest extends Request {
  user?: User; // Define the user property
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
