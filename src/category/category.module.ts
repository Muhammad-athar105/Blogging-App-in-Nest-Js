import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from './category.service';
import { PostCategoryRepository } from './category.repository';
import { CategoryController } from './category.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [PrismaService, CategoryService, PostCategoryRepository],
  controllers: [CategoryController,],
  exports: [CategoryService, PostCategoryRepository,]
})
export class CategoryModule { }
