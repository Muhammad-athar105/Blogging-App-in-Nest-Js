import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createComment(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: createCommentDto,
    });
  }

  async findAllComments() {
    return this.prisma.comment.findMany();
  }

  async getCommentById(id: string) {
    return this.prisma.comment.findUnique({
      where: { id },
    });
  }

  async updateComment(
    id: string,
    updateCommentDto: CreateCommentDto,
  ) {
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async deleteComment(id: string) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
