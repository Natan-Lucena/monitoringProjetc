import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { MailerService } from 'src/mailer/mailer.service';
import { SignUpService } from './services/sign-up.service';
import { SignUpController } from './controllers/sign-up.controller';
import { SignInService } from './services/sign-in.service';
import { SignInController } from './controllers/sign-in.controller';
import { SignTokenService } from './services/sign-token.service';
import { AuthenticateUserService } from './services/authenticate-user.service';
import { AuthenticateUserController } from './controllers/authenticate-user.controller';
import { MailToChangePasswordService } from './services/mail-to-change-password.service';
import { MailToChangePasswordController } from './controllers/mail-to-change-password.controller';
import { ChangePasswordService } from './services/change-password.service';
import { ChangePasswordController } from './controllers/change-password.controller';
import { AuthTokenRepository } from 'src/providers/repositories/authTokenRepository';
import { UserRepository } from 'src/providers/repositories/userRepository';
import { ProfessorRepository } from 'src/providers/repositories/professorRepository';
import { MonitorRepository } from 'src/providers/repositories/monitorRepository';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [SignUpController, SignInController, AuthenticateUserController, MailToChangePasswordController, ChangePasswordController],
  providers: [MonitorRepository ,ProfessorRepository ,UserRepository ,AuthTokenRepository ,JwtStrategy, MailerService, SignUpService, SignInService, SignTokenService, AuthenticateUserService, MailToChangePasswordService, ChangePasswordService],
})
export class AuthModule {}
