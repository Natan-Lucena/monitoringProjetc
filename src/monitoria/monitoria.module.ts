import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerService } from 'src/mailer/mailer.service';
import { DateProviderService } from 'src/date-provider/date-provider.service';
import { CreateMonitoriaService } from './services/create-monitoria.service';
import { CreateMonitoriaController } from './controllers/create-monitoria.controller';
import { GetMonitoriaByCadeirasService } from './services/get-monitoria-by-cadeiras.service';
import { GetMonitoriasByCadeirasController } from './controllers/get-monitorias-by-cadeiras.controller';
import { EditMonitoriaByIdService } from './services/edit-monitoria-by-id.service';
import { EditMonitoriaByIdController } from './controllers/edit-monitoria-by-id.controller';
import { DeleteMonitoriaByIdService } from './services/delete-monitoria-by-id.service';
import { DeleteMonitoriaByIdController } from './controllers/delete-monitoria-by-id.controller';
import { CadeiraRepository } from 'src/providers/repositories/cadeiraRepository';
import { UserRepository } from 'src/providers/repositories/userRepository';
import { MonitoriaRepository } from 'src/providers/repositories/monitoriaRepository';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateMonitoriaController,
    GetMonitoriasByCadeirasController,
    EditMonitoriaByIdController,
    DeleteMonitoriaByIdController,
  ],
  providers: [
    MonitoriaRepository,
    UserRepository,
    CadeiraRepository,
    MailerService,
    DateProviderService,
    CreateMonitoriaService,
    GetMonitoriaByCadeirasService,
    EditMonitoriaByIdService,
    DeleteMonitoriaByIdService,
  ],
})
export class MonitoriaModule {}
