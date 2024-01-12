import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMonitoriaDTO } from './dtos';
import { EditMonitoriaDTO } from './dtos/EditMonitoria.dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class MonitoriaService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
  ) {}

  async createMonitoria(idMonitor: string, dto: CreateMonitoriaDTO) {
    const user = await this.prisma.user.findFirst({
      where: { id: idMonitor },
    });
    if (!user.isMonitor) {
      throw new ForbiddenException('User is not a monitor');
    }
    const monitoria = await this.prisma.monitoria.create({
      data: { idMonitor, ...dto },
    });
    const users = await this.prisma.user.findMany({
      where: {
        cadeiras: { has: monitoria.idCadeira },
      },
    });
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      this.mailer.sendEmail({
        email: user.email,
        body: 'A new monitoria has been upload',
      });
    }
    return monitoria;
  }

  async getMonitoriasByCadeiras(cadeiras: string[]) {
    const value = [];
    for (let i = 0; i < cadeiras.length; i++) {
      const monitorias = await this.prisma.monitoria.findMany({
        where: {
          idCadeira: cadeiras[i],
        },
      });
      const monitoriaExists = monitorias[0];
      if (monitoriaExists) {
        value.push(monitorias);
      }
    }
    return value.flat();
  }

  async editMonitoriaById(
    idMonitor: string,
    idMonitoria: string,
    dto: EditMonitoriaDTO,
  ) {
    const user = await this.prisma.user.findFirst({
      where: { id: idMonitor },
    });
    if (!user.isMonitor) {
      throw new ForbiddenException('User is not a monitor');
    }

    const monitoria = await this.prisma.monitoria.update({
      where: {
        id: idMonitoria,
        idMonitor,
      },
      data: { ...dto },
    });

    const users = await this.prisma.user.findMany({
      where: {
        cadeiras: { has: monitoria.idCadeira },
      },
    });
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      this.mailer.sendEmail({
        email: user.email,
        body: 'The monitoria has been updated',
      });
    }

    return monitoria;
  }

  async deleteMonitoriaById(idMonitor: string, idMonitoria: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: idMonitor },
    });
    const monitoria = await this.prisma.monitoria.findFirst({
      where: { id: idMonitoria },
    });
    if (!user.isMonitor) {
      throw new ForbiddenException('User is not a monitor');
    }
    if (!monitoria) {
      throw new ForbiddenException('Monitoria does not exists');
    }
    await this.prisma.monitoria.delete({
      where: {
        id: idMonitoria,
      },
    });
    const users = await this.prisma.user.findMany({
      where: {
        cadeiras: { has: monitoria.idCadeira },
      },
    });
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      this.mailer.sendEmail({
        email: user.email,
        body: 'The monitoria has been deleted',
      });
    }
  }
}
