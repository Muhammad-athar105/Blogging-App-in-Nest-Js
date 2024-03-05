import { Injectable } from '@nestjs/common';
import { PostCategoryRepository } from './category.repository';
import { postCategoryRequestDto } from './dto/post-category.dto';
import { ConfigService } from '@nestjs/config';
import { Category } from '@prisma/client';


@Injectable()
export class CategoryService {
  constructor(
    private readonly postCategoryRepository: PostCategoryRepository,
    private readonly config: ConfigService,
  ) { }

  async createPostCategory(payload: postCategoryRequestDto, image: string) {
    const postCategoryData = {
      name: payload.name,
      image: image,
    };

    try {
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

  async updatePostCategory(id: string, postCategoryData: postCategoryRequestDto) {
    return this.postCategoryRepository.updatePostCategory(id, postCategoryData);
  }

  async deletePostCategory(id: string) {
    return this.postCategoryRepository.deletePostCategory(id);
  }

}
