import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMonitoriaDTO } from '../dtos';
import { MailerService } from 'src/mailer/mailer.service';
import { DateProviderService } from 'src/date-provider/date-provider.service';

@Injectable()
export class CreateMonitoriaService {
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
  
}
