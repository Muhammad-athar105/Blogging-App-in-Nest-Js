import { ApiProperty, ApiPropertyOptional, ApiTags } from "@nestjs/swagger"
import { Role } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator"


export class UpdateUserDto {

  @ApiProperty({ enum: Role, required: true })
  @IsEnum(Role, {
    each: true,
    message: 'role must be a valid enum value. e.g:  ADMIN, USER',
  })
  role: Role;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstName?: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastName: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  username: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password: string

}