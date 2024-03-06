import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Roles(Role.USER)
  @UseGuards(JwtGuard, RoleGuard)
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

  @Roles(Role.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: CreateCommentDto,
  ){
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Roles(Role.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  async deleteComment(@Param('id') id: string){
    return this.commentService.deleteComment(id);
  }
}
