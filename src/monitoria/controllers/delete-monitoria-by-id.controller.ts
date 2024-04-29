import {
    Controller,
    Delete,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import { DeleteMonitoriaByIdService } from '../services/delete-monitoria-by-id.service';
  import { GetUser } from 'src/auth/decorator';
  import { JwtGuard } from 'src/auth/guard';
  
  @Controller('monitoria')
  @UseGuards(JwtGuard)
  export class DeleteMonitoriaByIdController {
    constructor(private deleteMonitoriaByIdService: DeleteMonitoriaByIdService) {}
  
    @Delete('delete/:id')
    deleteMonitoriaById(
      @GetUser('id') userId: string,
      @Param('id') monitoriaId: string,
    ) {
      return this.deleteMonitoriaByIdService.deleteMonitoriaById(userId, monitoriaId);
    }
  }
