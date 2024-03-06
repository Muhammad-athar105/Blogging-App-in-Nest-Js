import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [CommentService, CommentRepository, PrismaService],
  controllers: [CommentController]
})
export class CommentModule {}
