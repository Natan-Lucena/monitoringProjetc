import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from '../dtos';
import * as argon from 'argon2';
import { SignTokenService } from './sign-token.service';

@Injectable()
export class SignInService {
  constructor(
    private prisma: PrismaService,
    private signTokenservice: SignTokenService
  ) {}

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
    return await this.signTokenservice.signToken(user.id, user.email);
  }
}
