import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, CreateUserDTO, ForgetPasswordDTO } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: CreateUserDTO) {
    return this.authService.singUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  singIn(@Body() dto: AuthDTO) {
    return this.authService.signIn(dto);
  }
  @Patch('authenticate/:id')
  async authenticateUser(@Param('id') userId) {
    await this.authService.authenticateUser(userId);
  }
  @HttpCode(HttpStatus.OK)
  @Post('forgetPassword')
  mailToChangePassword(@Body() dto: ForgetPasswordDTO) {
    return this.authService.mailToChangePassword(dto);
  }
}
