import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditMonitoriaDTO } from '../dtos';
import { MailerService } from 'src/mailer/mailer.service';
import { DateProviderService } from 'src/date-provider/date-provider.service';
import { MonitoriaRepository } from 'src/providers/repositories/monitoriaRepository';
import { UserRepository } from 'src/providers/repositories/userRepository';

@Injectable()
export class EditMonitoriaByIdService {
  constructor(
    private mailer: MailerService,
    private dateProvider: DateProviderService,
    private monitoriaRepository: MonitoriaRepository,
    private userRepository: UserRepository
  ) {}

  async editMonitoriaById(
    idMonitor: string,
    idMonitoria: string,
    dto: EditMonitoriaDTO,
  ) {
    const monitoriaExists = await this.monitoriaRepository.findMonitoriaById(idMonitoria)
    if (!monitoriaExists) {
      throw new ForbiddenException('Monitoria does not exists');
    }
    if (monitoriaExists.idMonitor !== idMonitor) {
      throw new ForbiddenException('User is not the monitor of this monitoria');
    }
    const startTime = dto.horarioInicio.toString();
    const nowDate = this.dateProvider.nowDate();
    const daysDiference = this.dateProvider.daysDiffData(startTime, nowDate);
    if (daysDiference > 0) {
      throw new ForbiddenException('Invalid date, check now date');
    }

    const monitoria = await this.monitoriaRepository.updateMonitoriaById(idMonitoria, dto);

    const usersId = monitoria.idAlunos;
    const users = await this.userRepository.getUsersById(usersId)
    users.map(async (user) => {
      await this.mailer.sendEmail({
        email: user.email,
        body: 'The monitoria has been updated',
      });
    });

    return monitoria;
  }

}
