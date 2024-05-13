import { ForbiddenException, Injectable } from '@nestjs/common';
import { ForgetPasswordDTO } from '../dtos';
import { MailerService } from 'src/mailer/mailer.service';
import { UserRepository } from 'src/providers/repositories/userRepository';

@Injectable()
export class MailToChangePasswordService {
  constructor(
    private mailer: MailerService,
    private userRepository: UserRepository,
  ) {}

  async mailToChangePassword({ email }: ForgetPasswordDTO) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new ForbiddenException('User does not exists');
    }
    await this.mailer.sendEmail({
      email,
      body: 'Did you forget your password?',
    });
  }
}