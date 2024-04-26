import {
    Controller,
    Param,
    Patch,
  } from '@nestjs/common';
  import { AuthenticateUserService } from '../services/authenticate-user.service';
  
  @Controller('auth')
  export class AuthenticateUserController {
    constructor(private authenticateUserService: AuthenticateUserService) {}
  
    
    @Patch('authenticate/:id')
    async authenticateUser(@Param('id') userId) {
      await this.authenticateUserService.authenticateUser(userId);
    }
}