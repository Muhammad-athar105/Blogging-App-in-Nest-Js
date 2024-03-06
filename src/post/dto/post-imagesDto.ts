import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PostImagesDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  url: string;
}