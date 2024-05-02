import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { EditMonitoriaByIdService } from '../services/edit-monitoria-by-id.service';
import { GetUser } from 'src/auth/decorator';
import { EditMonitoriaDTO } from '../dtos';
import { JwtGuard } from 'src/auth/guard';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('monitoria')
@Controller('monitoria')
@UseGuards(JwtGuard)
export class EditMonitoriaByIdController {
  constructor(private editMonitoriaByIdService: EditMonitoriaByIdService) {}

  @Patch('edit/:id')
  @ApiOperation({ summary: 'Update monitoring by Id' })
  @ApiParam({ name: 'id', description: 'Id of the monitoring to be updated' })
  @ApiBody({
    type: EditMonitoriaDTO,
    description: 'Data for updating monitoring',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monitoring updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Id not found or invalid update data',
  })
  edtiMonitoriaById(
    @GetUser('id') userId: string,
    @Param('id') monitoriaId: string,
    @Body() dto: EditMonitoriaDTO,
  ) {
    return this.editMonitoriaByIdService.editMonitoriaById(
      userId,
      monitoriaId,
      dto,
    );
  }
}
