import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditMonitoriaDTO } from '../dtos';
import { MailerService } from 'src/mailer/mailer.service';
import { DateProviderService } from 'src/date-provider/date-provider.service';

@Injectable()
export class EditMonitoriaByIdService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
    private dateProvider: DateProviderService,
  ) {}

  async editMonitoriaById(
    idMonitor: string,
    idMonitoria: string,
    dto: EditMonitoriaDTO,
  ) {
    const monitoriaExists = await this.prisma.monitoria.findFirst({
      where: { id: idMonitoria },
      select: { idMonitor: true },
    });
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

    const monitoria = await this.prisma.monitoria.update({
      where: {
        id: idMonitoria,
      },
      data: { ...dto },
    });

    const usersId = monitoria.idAlunos;
    const users = await this.prisma.user.findMany({
      where: {
        id: { in: usersId },
      },
    });
    users.map(async (user) => {
      await this.mailer.sendEmail({
        email: user.email,
        body: 'The monitoria has been updated',
      });
    });

    return monitoria;
  }

}
