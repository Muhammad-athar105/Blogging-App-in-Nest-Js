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
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
  }))
  async createPostCategory(@Body() payload: postCategoryRequestDto, @UploadedFile() file: Express.Multer.File) {
    return await this.categoryService.createPostCategory(payload, file.filename);
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
  async findAllCategories(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  updatePostCategory(@Param('id') id: string, @Body() postCategoryData: postCategoryRequestDto) {
    return this.categoryService.updatePostCategory(id, postCategoryData);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  deletePostCategory(@Param('id') id: string) {
    return this.categoryService.deletePostCategory(id);
  }



}
