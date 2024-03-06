import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostRepository } from './post.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [],
  providers: [PostService, PrismaService, PostRepository, CloudinaryService],
  controllers: [PostController],
  exports:[PostService]
})
export class PostModule {}
