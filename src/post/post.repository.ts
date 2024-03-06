import { PrismaService } from "src/prisma/prisma.service";
import { createPostDto } from "./dto/post-create.dto";
import { Post } from "@prisma/client";


export class PostRepository {
  constructor(private prisma: PrismaService) { }

  async createPost(postData: createPostDto){
    return this.prisma.post.create({
      data: postData,
    });
  }

  async getAllPosts(){
    return this.prisma.post.findMany();
  }

  async getPostById(id: string){
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async updatePost(id: string, postData: createPostDto){
    return this.prisma.post.update({
      where: { id },
      data: postData,
    });
  }

  async deletePost(id: string){
    return this.prisma.post.delete({
      where: { id },
    });
  }
}