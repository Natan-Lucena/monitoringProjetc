import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUserById(id: string) {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }
}
