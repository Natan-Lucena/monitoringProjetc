import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface ICreateUser{
  name: string;
  email: string;
  password: string;
  isMonitor: boolean;
  isProfessor: boolean;
}

interface IUpdatePasswordByEmail{
  password: string;
}

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUserById(id: string) {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }

  async getUsersById(usersId: string[]){
    return await this.prisma.user.findMany({
      where: {
        id: { in: usersId },
      },
    });
  }

  async updateUserById(id: string){
    return await this.prisma.user.update({ 
      where: { id }, 
      data: { active: true } });
  }

  async findUserByEmail(email: string){
    return await this.prisma.user.findFirst({ 
      where: { email } 
    });
  }

  async updatePasswordByEmail(email: string, dto: IUpdatePasswordByEmail){
    return await this.prisma.user.update({
      where: { email },
      data: {
        password: dto.password,
      },
    });
  }

  async findUniqueUserByEmail(email: string){
    return await this.prisma.user.findUnique({ 
      where: { email } 
    });
  }

  async createUser(dto: ICreateUser){
    return await this.prisma.user.create({
      data : { 
        email: dto.email, 
        password: dto.password, 
        name: dto.name, 
        isMonitor: dto.isMonitor, 
        isProfessor: dto.isProfessor 
      },
    });
  }
}
