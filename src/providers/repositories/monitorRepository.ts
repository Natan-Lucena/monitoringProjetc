import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

interface ICreateMonitor{
    id: string;
    token: string;
    idCadeira: string;
}

@Injectable()
export class MonitorRepository{
    constructor(private prisma: PrismaService){}

    async createMonitor(dto: ICreateMonitor){
        return await this.prisma.monitor.create({
            data: { 
                id: dto.id, 
                tokenProfessor: dto.token,
                idCadeira: dto.idCadeira,
            },
        });
    }
}