import { Injectable } from '@nestjs/common';
import { PostCategoryRepository } from './category.repository';
import { postCategoryRequestDto } from './dto/post-category.dto';
import { ConfigService } from '@nestjs/config';
import { Category } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Injectable()
export class CategoryService {
  constructor(
    private readonly postCategoryRepository: PostCategoryRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly config: ConfigService,
  ) { }

  async createPostCategory(payload: postCategoryRequestDto, file: Express.Multer.File) {
    try {
      const uploadResponse = await this.cloudinaryService.uploadFile(file);
      const imageUrl = uploadResponse.secure_url;

      const postCategoryData = {
        name: payload.name,
        image: imageUrl,
      };

      const postCategory = await this.postCategoryRepository.createPostCategory(postCategoryData);
      return postCategory;
    } catch (error) {
      throw error;
    }
  }

  async getPostCategoryById(id: string) {
    return this.postCategoryRepository.getPostCategoryById(id);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.postCategoryRepository.findAll();
  }
  async updatePostCategory(id: string, payload: postCategoryRequestDto, file: Express.Multer.File) {
    try {
      let imageUrl;
      if (file) {
        const uploadResponse = await this.cloudinaryService.uploadFile(file);
        imageUrl = uploadResponse.secure_url;
      }

      const categoryData = {
        name: payload.name,
        image: imageUrl,
      };
      return this.postCategoryRepository.updatePostCategory(id, payload);
    } catch (error) {
      throw error;
    }
  }
  // async updatePostCategory(id: string, postCategoryData: postCategoryRequestDto) {
  //   return this.postCategoryRepository.updatePostCategory(id, postCategoryData);
  // }

  async deletePostCategory(id: string) {
    return this.postCategoryRepository.deletePostCategory(id);
  }

}
