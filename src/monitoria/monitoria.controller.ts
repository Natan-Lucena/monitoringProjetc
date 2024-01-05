import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MonitoriaService } from './monitoria.service';
import { GetUser } from 'src/auth/decorator';
import { CreateMonitoriaDTO } from './dtos';
import { JwtGuard } from 'src/auth/guard';

@Controller('monitoria')
@UseGuards(JwtGuard)
export class MonitoriaController {
  constructor(private monitoriaService: MonitoriaService) {}

  @Post('create')
  createMonitoria(
    @GetUser('id') userId: string,
    @Body() dto: CreateMonitoriaDTO,
  ) {
    return this.monitoriaService.createMonitoria(userId, dto);
  }
}