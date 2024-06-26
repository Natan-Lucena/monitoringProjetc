import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';
import { EvalueteMonitoriaDTO } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('monitoriaRegister/:idMonitoria')
  userRegisterOnMonitoria(
    @GetUser('id') userId: string,
    @Param('idMonitoria') monitoriaId: string,
  ) {
    return this.userService.userRegisterOnMonitoria(userId, monitoriaId);
  }

  @Delete('monitoriaRegister/:idMonitoria')
  userUnregisterFromMonitoria(
    @GetUser('id') userId: string,
    @Param('idMonitoria') monitoriaId: string,
  ) {
    return this.userService.userUnregisterFromMonitoria(userId, monitoriaId);
  }

  @Patch('evalueteMonitoria')
  userEvaluetesMonitor(@Body() dto: EvalueteMonitoriaDTO) {
    return this.userService.userEvaluetesMonitor(dto);
  }

  @Patch('cadeira')
  userAddCadeira(@GetUser('id') userId: string, @Body() { cadeiraId }) {
    return this.userService.userAddCadeira(userId, cadeiraId);
  }

  @Delete('cadeira')
  userRemoveCadeira(@GetUser('id') userId: string, @Body() { cadeiraId }) {
    return this.userService.userRemoveCadeira(userId, cadeiraId);
  }
}
