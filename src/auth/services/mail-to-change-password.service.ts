import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForgetPasswordDTO } from '../dtos';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class MailToChangePasswordService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
  ) {}

  async mailToChangePassword({ email }: ForgetPasswordDTO) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new ForbiddenException('User does not exists');
    }
    await this.mailer.sendEmail({
      email,
      body: 'Did you forget your password?',
    });
  }
}