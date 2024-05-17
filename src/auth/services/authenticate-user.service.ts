import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthTokenRepository } from 'src/providers/repositories/authTokenRepository';
import { UserRepository } from 'src/providers/repositories/userRepository';

@Injectable()
export class AuthenticateUserService {
  constructor(
    private userRepository: UserRepository,
    private authTokenRepository: AuthTokenRepository,
  ) {}

  async authenticateUser(id: string, token: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.active) {
      throw new BadRequestException('User already active');
    }
    const tokenExists = await this.authTokenRepository.findAuthTokenByToken(token);
    if (!tokenExists) {
      throw new BadRequestException('Invalid Token');
    }
    if (tokenExists.userId !== id) {
      throw new BadRequestException('Invalid Token');
    }
    await this.userRepository.updateUserById(id);
  }
}
