// cloudinary.module.ts
import { Module } from '@nestjs/common';
// import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
// import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [ CloudinaryService, CloudinaryProvider],
  exports: [ CloudinaryService],
  controllers: []
})
export class CloudinaryModule {}
