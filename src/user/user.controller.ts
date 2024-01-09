import { Controller, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';

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
}
