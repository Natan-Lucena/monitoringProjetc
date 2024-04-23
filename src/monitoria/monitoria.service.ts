import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMonitoriaDTO } from './dtos';
import { EditMonitoriaDTO } from './dtos/EditMonitoria.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { DateProviderService } from 'src/date-provider/date-provider.service';

@Injectable()
export class MonitoriaService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
    private dateProvider: DateProviderService,
  ) {}

  async createMonitoria(idMonitor: string, dto: CreateMonitoriaDTO) {
    const user = await this.prisma.user.findFirst({
      where: { id: idMonitor },
    });
    if (!user.isMonitor) {
      throw new ForbiddenException('User is not a monitor');
    }
    const startTime = dto.horarioInicio.toString();
    const nowDate = this.dateProvider.nowDate();
    const daysDiference = this.dateProvider.daysDiffData(startTime, nowDate);
    if (daysDiference > 0) {
      throw new ForbiddenException('Invalid date, check now date');
    }
    const monitoria = await this.prisma.monitoria.create({
      data: { idMonitor, ...dto },
    });
    const usersCadastrados = await this.prisma.cadeira.findUnique({
      where: {
        id: dto.idCadeira,
      },
      select: {
        cadeirasCadastradas: { select: { user: { select: { email: true } } } },
      },
    });
    usersCadastrados.cadeirasCadastradas.map(async (user) => {
      await this.mailer.sendEmail({
        email: user.user.email,
        body: 'A new monitoria has been created',
      });
    });
    return monitoria;
  }

  async getMonitoriasByCadeiras(cadeiras: string[]) {
    return await this.prisma.cadeira.findMany({
      where: { id: { in: cadeiras } },
      select: { monitorias: true },
    });
  }

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

  async deleteMonitoriaById(idMonitor: string, idMonitoria: string) {
    const monitoria = await this.prisma.monitoria.findFirst({
      where: { id: idMonitoria },
      select: { idMonitor: true, idAlunos: true },
    });
    if (idMonitor != monitoria.idMonitor) {
      throw new ForbiddenException('User is not the owner of this monitoria');
    }
    if (!monitoria) {
      throw new ForbiddenException('Monitoria does not exists');
    }
    await this.prisma.monitoria.delete({
      where: {
        id: idMonitoria,
      },
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
        body: 'The monitoria has been deleted',
      });
    });
  }
}
