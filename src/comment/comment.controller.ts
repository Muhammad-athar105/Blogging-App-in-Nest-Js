import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  async getAllComments(){
    return this.commentService.findAllComments();
  }

  @Get(':id')
  async getCommentById(@Param('id') id: string){
    return this.commentService.getCoomentById(id);
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: CreateCommentDto,
  ){
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string){
    return this.commentService.deleteComment(id);
  }
}
