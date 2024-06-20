import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

interface ICreateAuthToken{
    token: string;
    userId: string;
  }

@Injectable()
export class AuthTokenRepository {
    constructor(private prisma: PrismaService){}

    async findAuthTokenByToken(token: string){
        return await this.prisma.authToken.findFirst({
            where: { token },
          });
    }   

    async createAuthToken(dto: ICreateAuthToken){
        return await this.prisma.authToken.create({
            data: {
              token: dto.token,
              userId: dto.userId,
            },
          });
    }
}