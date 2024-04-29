import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  refreshToken?: string;
  avatar?: string;
  ComparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// Type Definition for Request While Utilizing req.user for Auth in Logout Route
export interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: Pick<IUser, '_id'>;
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
