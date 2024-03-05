import { Body, Controller, Post } from '@nestjs/common';
import { UserSignupDto } from './dto/user-signup.dto';
import { userLoginRequestDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('signup')
  async signup(@Body() payload: UserSignupDto) {
    return await this.authService.signup(payload);
  }
  @Post('login')
  async login(@Body() payload:userLoginRequestDto) {
    return await this.authService.login(payload);
  }
}
