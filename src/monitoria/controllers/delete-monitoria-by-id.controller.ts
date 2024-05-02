import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DeleteMonitoriaByIdService } from '../services/delete-monitoria-by-id.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('monitoria')
@Controller('monitoria')
@UseGuards(JwtGuard)
export class DeleteMonitoriaByIdController {
  constructor(private deleteMonitoriaByIdService: DeleteMonitoriaByIdService) {}

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a Monitoring by id' })
  @ApiParam({ name: 'id', description: 'Id of the Monitoring to be deleted' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Monitoring successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Id not found or monitoring does not exist',
  })
  deleteMonitoriaById(
    @GetUser('id') userId: string,
    @Param('id') monitoriaId: string,
  ) {
    return this.deleteMonitoriaByIdService.deleteMonitoriaById(
      userId,
      monitoriaId,
    );
  }
}
