import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForgetPasswordDTO } from '../dtos';
import * as argon from 'argon2';

@Injectable()
export class ChangePasswordService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async changePassword({ email, password }: ForgetPasswordDTO) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    const passwordMatch = await argon.verify(user.password, password);
    if (passwordMatch) {
      throw new ForbiddenException('The password cannot be the same');
    }
    const hash = await argon.hash(password);
    return this.prisma.user.update({
      where: { email },
      data: {
        password: hash,
      },
    });
  }
}
