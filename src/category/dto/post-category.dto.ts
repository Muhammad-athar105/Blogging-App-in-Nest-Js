import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class postCategoryRequestDto {

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  image: string
}