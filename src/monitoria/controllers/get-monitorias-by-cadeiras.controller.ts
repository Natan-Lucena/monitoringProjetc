import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { GetMonitoriaByCadeirasService } from '../services/get-monitoria-by-cadeiras.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('monitoria')
@Controller('monitoria')
@UseGuards(JwtGuard)
export class GetMonitoriasByCadeirasController {
  constructor(
    private getMonitoriaByCadeirasService: GetMonitoriaByCadeirasService,
  ) {}

  @Get('get')
  @ApiOperation({ summary: 'View Monitorings' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monitorings retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Error when viewing monitoring',
  })
  getMonitoriasByCadeiras(@GetUser('cadeiras') cadeiras: string[]) {
    return this.getMonitoriaByCadeirasService.getMonitoriasByCadeiras(cadeiras);
  }
}
