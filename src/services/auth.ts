import { AuthServiceType, UserResponse } from '../interface';
import { genSalt, hash, compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { AuthRepository } from '../repository';
import { Exception } from '../helpers';

class AuthService implements AuthServiceType {
  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  private async validatePassword(
    password: string,
    savedPassword: string
  ): Promise<boolean> {
    return await compare(password, savedPassword);
  }

  removePassword(user: User) {
    let result: Partial<Pick<User, 'password'>> & UserResponse = {
      ...user,
    };
    if (result.password) {
      delete result.password;
    }
    return result;
  }

  async register(body: Omit<User, 'id'>): Promise<UserResponse> {
    let user = await AuthRepository.findByEmail(body.email);
    if (user) {
      new Exception('user already exists', 400);
    }
    body.password = await this.hashPassword(body.password);
    user = await AuthRepository.createUser(body);
    const result = this.removePassword(user);
    return result;
  }

  async login(
    data: Pick<User, 'email' | 'password'>
  ): Promise<UserResponse | null> {
    const user = await AuthRepository.findByEmail(data.email);
    if (!user) {
      throw new Exception('invalid username and password', 401);
    }
    const isPasswordValid = await this.validatePassword(
      data.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Exception('invalid username and password', 401);
    }
    const result = this.removePassword(user);
    return result;
  }
}

export default new AuthService();
