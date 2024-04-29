import {
    Controller,
    Get,
    UseGuards,
  } from '@nestjs/common';
  import { GetMonitoriaByCadeirasService } from '../services/get-monitoria-by-cadeiras.service';
  import { GetUser } from 'src/auth/decorator';
  import { JwtGuard } from 'src/auth/guard';
  
  @Controller('monitoria')
  @UseGuards(JwtGuard)
  export class GetMonitoriasByCadeirasController {
    constructor(private getMonitoriaByCadeirasService: GetMonitoriaByCadeirasService) {}
  
  
    @Get('get')
    getMonitoriasByCadeiras(@GetUser('cadeiras') cadeiras: string[]) {
      return this.getMonitoriaByCadeirasService.getMonitoriasByCadeiras(cadeiras);
    }

}