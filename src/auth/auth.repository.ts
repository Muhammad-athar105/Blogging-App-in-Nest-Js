import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) { }

  async createUser(userData: UserSignupDto) {
    try {
      const user = await this.prisma.user.create({
        data: userData,
      });
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async checkUserExistence(email: string, username: string) {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });
      return existingUser;
    } catch (error) {
      throw error;
    }
  }

  async findUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ],
      },
    });
  }

}
