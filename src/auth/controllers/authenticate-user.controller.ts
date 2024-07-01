import { Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { AuthenticateUserService } from '../services/authenticate-user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  @Patch('authenticate/:id/:token')
  @ApiOperation({ summary: 'Authenticate User' })
  @ApiParam({
    name: 'id',
    description: 'User id',
  })
  @ApiParam({
    name: 'token',
    description: 'User authentication token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User authenticated successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid user ID or token',
  })
  async authenticateUser(@Param('id') userId, @Param('token') token: string) {
    await this.authenticateUserService.authenticateUser(userId, token);
  }
}
