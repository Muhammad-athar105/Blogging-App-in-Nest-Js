import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { postCategoryRequestDto } from "./dto/post-category.dto";
import { Category } from "@prisma/client";

@Injectable()
export class PostCategoryRepository {
  constructor(private prisma: PrismaService) { }

  async createPostCategory(postCategoryData: postCategoryRequestDto) {
    try {
      const postCategory = await this.prisma.category.create({
        data: postCategoryData,
      });
      return postCategory;
    } catch (error) {
      throw error;
    }
  }

  async getPostCategoryById(id: string) {
    try {
      const postCategory = await this.prisma.category.findUnique({
        where: { id }
      });
      return postCategory;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async updatePostCategory(id: string, postCategoryData: postCategoryRequestDto) {
    try {
      const updatedPostCategory = await this.prisma.category.update({
        where: { id },
        data: postCategoryData
      });
      return updatedPostCategory;
    } catch (error) {
      throw error;
    }
  }

  async deletePostCategory(id: string) {
    try {
      const deletedPostCategory = await this.prisma.category.delete({
        where: { id }
      });
      return "Category deleted";
    } catch (error) {
      throw error;
    }
  }
}