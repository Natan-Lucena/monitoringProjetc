import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
}
