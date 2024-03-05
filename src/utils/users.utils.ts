import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UserUtils {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  validateUser(user: User) {
    if (!user) {
      throw new UnauthorizedException("User is not found")
    }
    return;
  }

}