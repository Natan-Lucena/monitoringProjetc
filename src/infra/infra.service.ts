import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { DateProviderService } from 'src/date-provider/date-provider.service';

@Injectable()
export class InfraService {
  constructor(
    private prisma: PrismaService,
    private dateProvider: DateProviderService,
  ) {}
  @Cron('00 00 00 * * *')
  async cleanMonitoriaDb() {
    const monitorias = await this.prisma.monitoria.findMany();
    const dateNow = this.dateProvider.nowDate();
    for (let i = 0; i < monitorias.length; i++) {
      const monitoria = monitorias[i];
      const monitoriaStartDate = monitoria.horarioInicio.toISOString();
      const dayDiff = this.dateProvider.daysDiffData(
        monitoriaStartDate,
        dateNow,
      );
      if (dayDiff >= 3) {
        await this.prisma.monitoria.delete({
          where: {
            id: monitoria.id,
          },
        });
      }
    }
  }
}
