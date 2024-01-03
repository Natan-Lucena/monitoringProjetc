import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from './../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { sub: string; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    delete user.password;

    if (user.isProfessor) {
      const professor = await this.prisma.professor.findUnique({
        where: { id: payload.sub },
      });
      return { user, professor };
    }

    if (user.isMonitor) {
      const monitor = await this.prisma.monitor.findUnique({
        where: { id: payload.sub },
      });
      return { user, monitor };
    }

    return { user };
  }
}
