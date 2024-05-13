import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { MailerService } from 'src/mailer/mailer.service';
import { generateToken } from 'src/utils/GenerateToken';
import { ProfessorRepository } from 'src/providers/repositories/professorRepository';
import { UserRepository } from 'src/providers/repositories/userRepository';
import { AuthTokenRepository } from 'src/providers/repositories/authTokenRepository';
import { MonitorRepository } from 'src/providers/repositories/monitorRepository';

@Injectable()
export class SignUpService {
  constructor(
    private mailer: MailerService,
    private professorRepository: ProfessorRepository,
    private userRepository: UserRepository,
    private autTokenRepository: AuthTokenRepository,
    private monitorRepository: MonitorRepository
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
        const tokenExists = await this.professorRepository.findProfessorByToken(token);
        if (!tokenExists) {
          throw new ForbiddenException('Professor token does not exists');
        }
      }
      const user = await this.userRepository.createUser({password: hash, email, isMonitor, isProfessor, name})
      const userToken = generateToken();
      await this.autTokenRepository.createAuthToken({token: userToken, userId: user.id})
      await this.mailer.sendEmail({ email, body: 'Seu token é ' + userToken });
      delete user.password;

      if (isProfessor) {
        if (!token) {
          token = '';
        }
        const professor = await this.professorRepository.createProfessor({id: user.id, token})
        return { user, professor };
      }
      if (isMonitor) {
        const monitor = await this.monitorRepository.createMonitor({id: user.id, token, idCadeira: ''})
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
