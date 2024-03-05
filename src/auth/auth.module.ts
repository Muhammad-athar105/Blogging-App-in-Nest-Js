import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';


@Module({
  imports: [JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: { expiresIn: 'JWT_EXPIRATION_TIME' },
  }),],
  providers: [AuthService, PrismaService, AuthRepository, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, AuthRepository]
})
export class AuthModule {
}
