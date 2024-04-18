import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetUserService {
  constructor(private prisma: PrismaService) {}

  async execute(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      select: {
        email: true,
        isMonitor: true,
        isProfessor: true,
        name: true,
        cadeiras: true,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
