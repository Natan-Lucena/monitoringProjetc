import { Module } from '@nestjs/common';
import { MonitoriaController } from './monitoria.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MonitoriaService } from './monitoria.service';
import { MailerService } from 'src/mailer/mailer.service';
import { DateProviderService } from 'src/date-provider/date-provider.service';

@Module({
  imports: [PrismaModule],
  controllers: [MonitoriaController],
  providers: [MonitoriaService, MailerService, DateProviderService],
})
export class MonitoriaModule {}
