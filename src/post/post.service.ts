import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { createPostDto } from './dto/post-create.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {

  constructor(
    private readonly postRepository: PostRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  async createPost(payload: createPostDto, files: Express.Multer.File[]) {
    let imageUrl;
    if (files && files.length > 0) {
      const uploadResponse = await this.cloudinaryService.uploadMultipleFiles(files);
      imageUrl = uploadResponse.map(response => response.secure_url);
    }

    const postData = {
      title: payload.title,
      description: payload.description,
      userId: payload.userId,
      categoryId: payload.categoryId,
      images: imageUrl
    }

    return this.postRepository.createPost(postData);
  }


  // Get All posts
  async getAllPosts() {
    return await this.postRepository.getAllPosts();
  }

  // Get By Id
  async getPostById(id: string) {
    const post = await this.postRepository.getPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  // update post
  async updatePost(id: string, payload: createPostDto) {
    const post = await this.getPostById(id);
    return await this.postRepository.updatePost(post.id, payload);
  }

  async deletePost(id: string) {
    const post = await this.getPostById(id);
    return await this.postRepository.deletePost(post.id);
  }
}
