import { ForbiddenException, Injectable } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import { MonitoriaRepository } from 'src/providers/repositories/monitoriaRepository';
import { UserRepository } from 'src/providers/repositories/userRepository';

@Injectable()
export class DeleteMonitoriaByIdService {
  constructor(
    private mailer: MailerService,
    private monitoriaRepository: MonitoriaRepository,
    private userRepository: UserRepository,
  ) {}

  async deleteMonitoriaById(idMonitor: string, idMonitoria: string) {
    const monitoria = await this.monitoriaRepository.findMonitoriaById(idMonitoria);
    if (idMonitor != monitoria.idMonitor) {
      throw new ForbiddenException('User is not the owner of this monitoria');
    }
    if (!monitoria) {
      throw new ForbiddenException('Monitoria does not exists');
    }
    await this.monitoriaRepository.deleteMonitoriaById(idMonitoria);
    const usersId = monitoria.idAlunos;
    const users = await this.userRepository.getUsersById(usersId);
    
    users.map(async (user) => {
      await this.mailer.sendEmail({
        email: user.email,
        body: 'The monitoria has been deleted',
      });
    });
  }
}
