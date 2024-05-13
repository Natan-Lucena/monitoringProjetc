import { ForbiddenException, Injectable } from '@nestjs/common';
import { ForgetPasswordDTO } from '../dtos';
import * as argon from 'argon2';
import { UserRepository } from 'src/providers/repositories/userRepository';

@Injectable()
export class ChangePasswordService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async changePassword({ email, password }: ForgetPasswordDTO) {
    const user = await this.userRepository.findUserByEmail(email);
    const passwordMatch = await argon.verify(user.password, password);
    if (passwordMatch) {
      throw new ForbiddenException('The password cannot be the same');
    }
    const hash = await argon.hash(password);
    return this.userRepository.updatePasswordByEmail(email, {password: hash})
  }
}
