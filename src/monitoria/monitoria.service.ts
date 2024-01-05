import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMonitoriaDTO } from './dtos';

@Injectable()
export class MonitoriaService {
  constructor(private prisma: PrismaService) {}

  async createMonitoria(idMonitor: string, dto: CreateMonitoriaDTO) {
    const user = await this.prisma.user.findFirst({
      where: { id: idMonitor },
    });
    console.log(user);
    if (!user.isMonitor) {
      throw new ForbiddenException('User is not a monitor');
    }
    const monitoria = await this.prisma.monitoria.create({
      data: { idMonitor, ...dto },
    });
    return monitoria;
  }
}
