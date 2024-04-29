import {
    Body,
    Controller,
    Param,
    Patch,
    UseGuards,
  } from '@nestjs/common';
  import { EditMonitoriaByIdService } from '../services/edit-monitoria-by-id.service';
  import { GetUser } from 'src/auth/decorator';
  import { EditMonitoriaDTO } from '../dtos';
  import { JwtGuard } from 'src/auth/guard';
  
  @Controller('monitoria')
  @UseGuards(JwtGuard)
  export class EditMonitoriaByIdController {
    constructor(private editMonitoriaByIdService: EditMonitoriaByIdService) {}
  
    @Patch('edit/:id')
    edtiMonitoriaById(
      @GetUser('id') userId: string,
      @Param('id') monitoriaId: string,
      @Body() dto: EditMonitoriaDTO,
    ) {
      return this.editMonitoriaByIdService.editMonitoriaById(userId, monitoriaId, dto);
    }

}
