import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { argon2d } from 'argon2';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }
  
  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete user.password;
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async removeUser(id: string){
    const user = await this.userRepository.remove(id);
    if (!id) {
      throw new NotFoundException('User not found');
    }
    
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> { 
    try {
      const updatedUser = await this.userRepository.update(id, userData); 
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  
  
  // async findAllUsers(): Promise<User[]> {
  //   const users = await this.userRepository.findAll();
  //   if (!users || users.length === 0) {
  //     throw new NotFoundException('No users found');
  //   }
  //   // Remove passwords from user objects
  //   const usersWithoutPasswords = users.map(user => {
  //     const { password, ...userWithoutPassword } = user;
  //     return userWithoutPassword;
  //   });
  //   return usersWithoutPasswords;
  // }
}
