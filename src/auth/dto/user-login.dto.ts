import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class userLoginRequestDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ minLength: 4, maxLength: 10, required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEnum(Role, {
    each: true,
    message: 
    'role must be a valid enum value. e.g: ADMIN, USER',
  })
  role: Role

}