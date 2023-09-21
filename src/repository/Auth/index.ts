import { User } from '@prisma/client';
import prisma from '../../config/prisma';

class AuthRepository {
  async createUser(data: Omit<User, 'id'>): Promise<User> {
    const result = await prisma.user.create({ data });
    return result;
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }
}

export default new AuthRepository();
