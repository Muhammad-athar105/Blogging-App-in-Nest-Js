import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { postCategoryRequestDto } from './dto/post-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators';
import { Category, Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))

  async createPostCategory(
    @Body() payload: postCategoryRequestDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      return await this.categoryService.createPostCategory(payload, file);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  getPostCategoryById(@Param('id') id: string) {
    return this.categoryService.getPostCategoryById(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async findAllCategories() {
    return this.categoryService.findAllCategories();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  
  async updateCategory(
    @Param('id') id: string,
    @Body() payload: postCategoryRequestDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      return await this.categoryService.updatePostCategory(id, payload, file);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  deletePostCategory(@Param('id') id: string) {
    return this.categoryService.deletePostCategory(id);
  }



}
