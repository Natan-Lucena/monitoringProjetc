import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EvalueteMonitoriaDTO } from './dtos';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
  ) {}

  async userRegisterOnMonitoria(userId: string, monitoriaId: string) {
    // TO DO: AVISAR AO MONITOR QUEM CONECTOU
    const monitoria = await this.prisma.monitoria.findFirst({
      where: { id: monitoriaId },
    });
    if (!monitoria) {
      throw new ForbiddenException('Monitoria does not exists!');
    }
    if (monitoria.idAlunos.includes(userId)) {
      throw new ForbiddenException('User is already registed on the Monitoria');
    }
    const monitor = await this.prisma.user.findFirst({
      where: {
        id: monitoria.idMonitor,
      },
    });
    await this.mailer.sendEmail({
      email: monitor.email,
      body: 'New user on monitoria',
    });
    const idAlunos = monitoria.idAlunos;
    idAlunos.push(userId);

    return this.prisma.monitoria.update({
      where: {
        id: monitoriaId,
      },
      data: {
        alunosCadastrados: monitoria.alunosCadastrados + 1,
        idAlunos,
      },
    });
  }
  async userUnregisterFromMonitoria(userId: string, monitoriaId: string) {
    // TO DO: AVISAR AO MONITOR QUEM CONECTOU
    const monitoria = await this.prisma.monitoria.findFirst({
      where: { id: monitoriaId },
    });
    if (!monitoria) {
      throw new ForbiddenException('Monitoria does not exists!');
    }
    if (!monitoria.idAlunos.includes(userId)) {
      throw new ForbiddenException('User is not registed on the Monitoria');
    }
    const monitor = await this.prisma.user.findFirst({
      where: {
        id: monitoria.idMonitor,
      },
    });
    await this.mailer.sendEmail({
      email: monitor.email,
      body: 'A user has quit the monitoria',
    });

    const idAlunos = monitoria.idAlunos;
    const indexOfAluno = idAlunos.indexOf(userId);
    idAlunos.splice(indexOfAluno, 1);

    return this.prisma.monitoria.update({
      where: {
        id: monitoriaId,
      },
      data: {
        alunosCadastrados: monitoria.alunosCadastrados - 1,
        idAlunos,
      },
    });
  }

  async userEvaluetesMonitor({ avaliacao, idMonitoria }: EvalueteMonitoriaDTO) {
    const monitoriaAvaliada = await this.prisma.monitoria.findFirst({
      where: {
        id: idMonitoria,
      },
    });
    if (!monitoriaAvaliada) {
      throw new ForbiddenException('Invalid monitoria');
    }
    if (avaliacao > 10 || avaliacao < 0) {
      throw new ForbiddenException('Invalid evaluation');
    }
    const idMonitor = monitoriaAvaliada.idMonitor;
    const monitor = await this.prisma.monitor.findFirst({
      where: {
        id: idMonitor,
      },
    });
    const nota =
      (monitor.nota * monitor.totalDeAvaliacoes + avaliacao) /
      (monitor.totalDeAvaliacoes + 1);
    return this.prisma.monitor.update({
      where: {
        id: idMonitor,
      },
      data: {
        nota,
        totalDeAvaliacoes: monitor.totalDeAvaliacoes + 1,
      },
    });
  }

  async userAddCadeira(userId: string, cadeiraId: string) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    const cadeiras = user.cadeiras;
    cadeiras.push(cadeiraId);
    return this.prisma.user.update({
      where: { id: userId },
      data: { cadeiras },
    });
  }
}
