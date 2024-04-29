import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class DeleteMonitoriaByIdService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
  ) {}

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
