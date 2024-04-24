import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthenticateUserService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async authenticateUser(id: string) {
    await this.prisma.user.update({ where: { id }, data: { active: true } });
  }

}
