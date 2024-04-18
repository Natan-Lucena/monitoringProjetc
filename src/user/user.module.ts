import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerService } from 'src/mailer/mailer.service';
import { GetUserService } from './services/getUser.service';

@Module({
  imports: [PrismaModule],
  providers: [GetUserService, UserService, MailerService],
  controllers: [UserController],
})
export class UserModule {}
