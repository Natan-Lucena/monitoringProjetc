import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetMonitoriaByCadeirasService {
  constructor(
    private prisma: PrismaService,
  ) {}


  async getMonitoriasByCadeiras(cadeiras: string[]) {
    return await this.prisma.cadeira.findMany({
      where: { id: { in: cadeiras } },
      select: { monitorias: true },
    });
  }

}
