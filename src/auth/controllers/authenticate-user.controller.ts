import { Controller, Param, Patch } from '@nestjs/common';
import { AuthenticateUserService } from '../services/authenticate-user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  @Patch('authenticate/:id/:token')
  async authenticateUser(@Param('id') userId, @Param('token') token: string) {
    await this.authenticateUserService.authenticateUser(userId, token);
  }
}
