import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '@prisma/client'

export class UserSignupDto {


  @ApiProperty({ enum: Role, required: true })
  @IsEnum(Role, {
    each: true,
    message: 'role must be a valid enum value. e.g:  ADMIN, USER',
  })
  role: Role;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  firstName: string

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  lastName: string

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  password: string
}