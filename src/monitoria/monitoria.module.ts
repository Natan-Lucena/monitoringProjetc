import { Module } from '@nestjs/common';
import { MonitoriaController } from './monitoria.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MonitoriaService } from './monitoria.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [PrismaModule],
  controllers: [MonitoriaController],
  providers: [MonitoriaService, MailerService],
})
export class MonitoriaModule {}
