import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from '../dtos';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { MailerService } from 'src/mailer/mailer.service';
import { generateToken } from 'src/utils/GenerateToken';

@Injectable()
export class SignUpService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
  ) {}

  async singUp({
    email,
    password,
    isMonitor,
    isProfessor,
    name,
    token,
  }: CreateUserDTO) {
    const hash = await argon.hash(password);
    try {
      if (isMonitor) {
        const tokenExists = await this.prisma.professor.findFirst({
          where: { token },
        });
        if (!tokenExists) {
          throw new ForbiddenException('Professor token does not exists');
        }
      }
      const user = await this.prisma.user.create({
        data: { email, password: hash, name, isMonitor, isProfessor },
      });
      const userToken = generateToken();
      await this.prisma.authToken.create({
        data: {
          token: userToken,
          userId: user.id,
        },
      });
      await this.mailer.sendEmail({ email, body: 'Seu token é ' + userToken });
      delete user.password;

      if (isProfessor) {
        if (!token) {
          token = '';
        }
        const professor = await this.prisma.professor.create({
          data: { id: user.id, token },
        });
        return { user, professor };
      }
      if (isMonitor) {
        const monitor = await this.prisma.monitor.create({
          data: { id: user.id, tokenProfessor: token, idCadeira: '' },
        });
        return { user, monitor };
      }
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential already used');
        }
      }
      throw error;
    }
  }
}
