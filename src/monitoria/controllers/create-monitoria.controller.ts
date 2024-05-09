import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateMonitoriaService } from '../services/create-monitoria.service';
import { GetUser } from 'src/auth/decorator';
import { CreateMonitoriaDTO } from '../dtos';
import { JwtGuard } from 'src/auth/guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('monitoria')
@Controller('monitoria')
@UseGuards(JwtGuard)
export class CreateMonitoriaController {
  constructor(private createMonitoriaService: CreateMonitoriaService) {}

  @Post('create')
  @ApiOperation({ summary: 'Created a Monitoring' })
  @ApiBody({
    type: CreateMonitoriaDTO,
    description: 'Data to create Monitoring',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monitoring created successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Incorrect data or Monitoring already exists',
  })
  async createMonitoria(
    @GetUser('id') userId: string,
    @Body() dto: CreateMonitoriaDTO,
  ) {
    return await this.createMonitoriaService.createMonitoria(userId, dto);
  }
}
