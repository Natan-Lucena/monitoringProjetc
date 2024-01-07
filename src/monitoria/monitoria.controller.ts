import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MonitoriaService } from './monitoria.service';
import { GetUser } from 'src/auth/decorator';
import { CreateMonitoriaDTO, EditMonitoriaDTO } from './dtos';
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

  @Get('get')
  getMonitoriasByCadeiras(@GetUser('cadeiras') cadeiras: string[]) {
    return this.monitoriaService.getMonitoriasByCadeiras(cadeiras);
  }

  @Patch('edit/:id')
  edtiMonitoriaById(
    @GetUser('id') userId: string,
    @Param('id') monitoriaId: string,
    @Body() dto: EditMonitoriaDTO,
  ) {
    return this.monitoriaService.editMonitoriaById(userId, monitoriaId, dto);
  }

  @Delete('delete/:id')
  deleteMonitoriaById(
    @GetUser('id') userId: string,
    @Param('id') monitoriaId: string,
  ) {
    return this.monitoriaService.deleteMonitoriaById(userId, monitoriaId);
  }
}
