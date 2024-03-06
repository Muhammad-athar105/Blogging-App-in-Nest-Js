// category.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from './category.service';
import { PostCategoryRepository } from './category.repository';
import { CategoryController } from './category.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'; 

@Module({
  imports: [],
  providers: [PrismaService, CategoryService, PostCategoryRepository, CloudinaryService], 
  controllers: [CategoryController],
  exports: [CategoryService, PostCategoryRepository],
})
export class CategoryModule {}
