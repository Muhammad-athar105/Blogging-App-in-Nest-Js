import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserSignupDto } from './dto/user-signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AuthRepository } from './auth.repository';
import { userLoginRequestDto } from './dto/user-login.dto';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwt: JwtService,
    private readonly config: ConfigService,
  ) { }

  async signup(payload: UserSignupDto) {
    try {
      // Check if user with the given email or username already exists
      const existingUser = await this.authRepository.checkUserExistence(
        payload.email,
        payload.username,
      );

      if (existingUser) {
        throw new ForbiddenException(
          'User already exists. Please try with another username or email',
        );
      }

      // Hash the password
      const hashedPassword = await argon2.hash(payload.password);

      // Create user data object
      const userData = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: hashedPassword,
        username: payload.username,
        role: payload.role,
      };

      // Create user
      const newUser = await this.authRepository.createUser(userData);
      return newUser;
    } catch (error) {
      throw error;
    }
  }


  async login(payload: userLoginRequestDto) {
    const user = await this.authRepository.findUserByUsernameOrEmail(payload.username);

    if (!user) {
      throw new ForbiddenException("USER NOT FOUND");
    }

    const validPassword = await argon2.verify(user.password, payload.password);

    if (!validPassword) {
      throw new ForbiddenException("Invalid Password");
    }

    delete user.password;

    return { ...user, access_token: await this.signToken(user) };
  }

  private async signToken(user: User): Promise<string> {
    const payload = {
      username: user.username,
      sub: user.id,
      type: user.role,
      email: user.email,
    };
    return this.jwt.signAsync(payload, {
      secret: this.config.get<string>("JWT_SECRET"),
      expiresIn: this.config.get<string>("JWT_EXPIRATION_TIME"),
    });
  }
};
