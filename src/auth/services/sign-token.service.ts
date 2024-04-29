import {Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignTokenService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}


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
}
