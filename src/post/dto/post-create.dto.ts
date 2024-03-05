import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class postCreateRequestDto {

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  userId: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  categoryId: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  commentId: string
}