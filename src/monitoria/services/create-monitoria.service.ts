import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMonitoriaDTO } from '../dtos';
import { MailerService } from 'src/mailer/mailer.service';
import { DateProviderService } from 'src/date-provider/date-provider.service';
import { UserRepository } from 'src/providers/repositories/userRepository';
import { MonitoriaRepository } from 'src/providers/repositories/monitoriaRepository';
import { CadeiraRepository } from 'src/providers/repositories/cadeiraRepository';

@Injectable()
export class CreateMonitoriaService {
  constructor(
    private userRepository: UserRepository,
    private monitoriaRepository: MonitoriaRepository,
    private cadeiraRepository: CadeiraRepository,
    private mailer: MailerService,
    private dateProvider: DateProviderService,
  ) {}

  async createMonitoria(idMonitor: string, dto: CreateMonitoriaDTO) {
    const user = await this.userRepository.findUserById(idMonitor);

    if (!user.isMonitor) {
      throw new ForbiddenException('User is not a monitor');
    }
    const startTime = dto.horarioInicio.toString();
    const nowDate = this.dateProvider.nowDate();
    const daysDiference = this.dateProvider.daysDiffData(startTime, nowDate);
    if (daysDiference > 0) {
      throw new ForbiddenException('Invalid date, check now date');
    }
    const monitoria = await this.monitoriaRepository.createMonitoria({
      idMonitor,
      ...dto,
    });
    const usersCadastrados = await this.cadeiraRepository.getUsersByCadeiraId(
      dto.idCadeira,
    );
    usersCadastrados.cadeirasCadastradas.map(async (user) => {
      await this.mailer.sendEmail({
        email: user.user.email,
        body: 'A new monitoria has been created',
      });
    });
    return monitoria;
  }
}
