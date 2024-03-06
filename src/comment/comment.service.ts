import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {

  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(createCommentDto: CreateCommentDto){
    return this.commentRepository.createComment(createCommentDto);
  }

  async findAllComments() {
    return this.commentRepository.findAllComments();
  }

  async getCoomentById(id: string){
    const comment = await this.commentRepository.getCommentById(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async updateComment(
    id: string,
    updateCommentDto: CreateCommentDto,
  ) {
    return this.commentRepository.updateComment(id, updateCommentDto);
  }

  async deleteComment(id: string){
    return this.commentRepository.deleteComment(id);
  }
  
}
