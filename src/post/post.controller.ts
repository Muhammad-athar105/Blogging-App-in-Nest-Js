import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { Roles } from 'src/decorators';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { createPostDto } from './dto/post-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Roles(Role.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 10 },
  ]))


  async createPost(
    @Body() payload: createPostDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return await this.postService.createPost(payload, files);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async getAllPosts(){
    return await this.postService.getAllPosts();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  async getPostById(@Param('id') id: string){
    return await this.postService.getPostById(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() payload: createPostDto
  ){
    return await this.postService.updatePost(id, payload);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string){
    return await this.postService.deletePost(id);
  }
}
