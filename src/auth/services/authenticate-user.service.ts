import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthenticateUserService {
  constructor(private prisma: PrismaService) {}

  async authenticateUser(id: string, token: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.active) {
      throw new BadRequestException('User already active');
    }
    const tokenExists = await this.prisma.authToken.findFirst({
      where: { token },
    });
    if (!tokenExists) {
      throw new BadRequestException('Invalid Token');
    }
    if (tokenExists.userId !== id) {
      throw new BadRequestException('Invalid Token');
    }
    await this.prisma.user.update({ where: { id }, data: { active: true } });
  }
}
