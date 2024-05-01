import mongoose from 'mongoose';
import { Request } from 'express';

export interface IUser extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  refreshToken?: string;
  avatar?: CloudinaryImage;
  ComparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  deleteAvatar(): void;
}

export interface CloudinaryImage {
  publicId: string;
  url: string;
}

// Type Definition for Request While Utilizing req.user
export interface IGetUserAuthInfoRequest extends Request {
  user?: {
    _id?: string | undefined;
  };
}

export interface TOKENS {
  readonly ACCESS_TOKEN_SECRET: string;
  readonly REFRESH_TOKEN_SECRET: string;
}

// Type Definition for Generate Token Function
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
