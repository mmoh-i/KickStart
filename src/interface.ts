import { User } from '@prisma/client';
import { Request } from 'express';

export type Data = {
  [key: string]: any;
};

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = Omit<User, 'password'> & TokenType;
export type RegisterResponse = Omit<User, 'password'> & TokenType;

export type AuthServiceType = {
  register(body: Omit<User, 'id'>): Promise<LoginResponse>;
  login(data: Pick<User, 'email' | 'password'>): Promise<LoginResponse | null>;
};

export type JwtPayload = {
  id: string;
  iat: number;
  exp: number;
  role: string;
};

export interface CustomRequest extends Request {
  user?: JwtPayload; // Define the 'user' property
}
