import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CadeiraRepository {
  constructor(private prisma: PrismaService) {}

  async getUsersByCadeiraId(idCadeira: string) {
    return await this.prisma.cadeira.findUnique({
      where: {
        id: idCadeira,
      },
      select: {
        cadeirasCadastradas: { select: { user: { select: { email: true } } } },
      },
    });
  }

  async getMonitoriasByCadeiras(cadeiras: string[]){
    return await this.prisma.cadeira.findMany({
      where: { id: { in: cadeiras } },
      select: { monitorias: true },
    });
  }
}
