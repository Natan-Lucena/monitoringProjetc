import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface ICreateMonitoria {
  cadeiraName: string;
  horarioInicio: Date;
  horarioFim: Date;
  sala: string;
  obs?: string;
  idCadeira: string;
  idMonitor: string;
}

@Injectable()
export class MonitoriaRepository {
  constructor(private prisma: PrismaService) {}

  async createMonitoria(dto: ICreateMonitoria) {
    return await this.prisma.monitoria.create({ data: dto });
  }
}
