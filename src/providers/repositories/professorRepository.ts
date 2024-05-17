import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

interface ICreateProfessor{
    id: string;
    token: string;
}

@Injectable()
export class ProfessorRepository{
    constructor(private prisma: PrismaService){}

    async findProfessorByToken(token: string){
        return await this.prisma.professor.findFirst({
            where: { token },
          });
    }

    async createProfessor(dto: ICreateProfessor){
        return await this.prisma.professor.create({
            data: { 
                id: dto.id, 
                token: dto.token, 
            },
          });
    }

}