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

interface IEditMonitoria{
  horarioInicio?: Date;
  horarioFim?: Date;
  sala?: string;
  cadeiraName?: string;
}

@Injectable()
export class MonitoriaRepository {
  constructor(private prisma: PrismaService) {}

  async createMonitoria(dto: ICreateMonitoria) {
    return await this.prisma.monitoria.create({ 
      data: dto 
    });
  }

  async findMonitoriaById(idMonitoria: string){
    return await this.prisma.monitoria.findFirst({
      where: { 
        id: idMonitoria 
      },
    });
  }

  async deleteMonitoriaById(idMonitoria: string){
    return await this.prisma.monitoria.delete({
      where: {
        id: idMonitoria,
      },
    });
  }

  async updateMonitoriaById(idMonitoria: string, dto: IEditMonitoria){
    return await this.prisma.monitoria.update({
      where: {
        id: idMonitoria,
      },
      data: { ...dto },
    });
  }
}
