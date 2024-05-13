import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDTO } from '../dtos';
import * as argon from 'argon2';
import { SignTokenService } from './sign-token.service';
import { UserRepository } from 'src/providers/repositories/userRepository';

@Injectable()
export class SignInService {
  constructor(
    private signTokenservice: SignTokenService,
    private userRepository: UserRepository,
  ) {}

  async signIn({ email, password }: AuthDTO) {
    const user = await this.userRepository.findUniqueUserByEmail(email);
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
