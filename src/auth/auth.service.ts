import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { AuthDTO, CreateUserDTO } from './dtos';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
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
      await this.mailer.sendEmail({ email, body: '' });
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
  async signIn({ email, password }: AuthDTO) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    if (!user.active) {
      throw new ForbiddenException('User not activated yet');
    }
    const passwordMatch = await argon.verify(user.password, password);
    if (!passwordMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return await this.signToken(user.id, user.email);
  }

  async signToken(userId: string, email: string): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret,
    });
    return { token };
  }

  async authenticateUser(id: string) {
    await this.prisma.user.update({ where: { id }, data: { active: true } });
  }
}
