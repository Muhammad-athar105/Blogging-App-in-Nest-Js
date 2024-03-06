import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateCommentDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsString()
  readonly userId: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly postId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly parentId?: string;

}
