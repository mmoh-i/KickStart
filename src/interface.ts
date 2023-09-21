import { User } from '@prisma/client';
import { Request } from 'express';

export type Data = {
  [key: string]: any;
};

export type UserResponse = Omit<User, 'password'>;

export type AuthServiceType = {
  register(body: Omit<User, 'id'>): Promise<UserResponse>;
  login(data: Pick<User, 'email' | 'password'>): Promise<UserResponse | null>;
};

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};
export type UserJWT = {
  id: string;
  iat: number;
  exp: number;
  role: string;
};

export interface CustomRequest extends Request {
  user?: UserJWT; // Define the 'user' property
}
