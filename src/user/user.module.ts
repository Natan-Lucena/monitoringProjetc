import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, MailerService],
  controllers: [UserController],
})
export class UserModule {}
