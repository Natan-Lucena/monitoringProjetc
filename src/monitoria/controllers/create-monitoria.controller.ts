import {
    Body,
    Controller,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { CreateMonitoriaService } from '../services/create-monitoria.service';
  import { GetUser } from 'src/auth/decorator';
  import { CreateMonitoriaDTO } from '../dtos';
  import { JwtGuard } from 'src/auth/guard';
  
  @Controller('monitoria')
  @UseGuards(JwtGuard)
  export class CreateMonitoriaController {
    constructor(private createMonitoriaService: CreateMonitoriaService) {}
  
    @Post('create')
    createMonitoria(
      @GetUser('id') userId: string,
      @Body() dto: CreateMonitoriaDTO,
    ) {
      return this.createMonitoriaService.createMonitoria(userId, dto);
    }
}
