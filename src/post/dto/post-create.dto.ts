import { ApiProperty } from "@nestjs/swagger";
import { PostImages } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { PostImagesDto } from "./post-imagesDto";

export class createPostDto {

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  images?: PostImagesDto[];
}
