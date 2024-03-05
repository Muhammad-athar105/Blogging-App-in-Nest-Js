import { Body, Controller, Delete, Get, NotFoundException, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Role, User } from '@prisma/client';
import { Roles } from 'src/decorators';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUser(id);
    if (!user || null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<void> {
    await this.userService.removeUser(id);
  }


  @Roles(Role.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto): Promise<User> {
    const user = await this.userService.updateUser(id, payload);
    if (!user) {
      throw new NotFoundException("USER NOT FOUND");
    }
    return user;
  }
}
