import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
  } from '@nestjs/common';
  import { MailToChangePasswordService } from '../services/mail-to-change-password.service';
  import { ForgetPasswordDTO } from '../dtos';
  
  @Controller('auth')
  export class MailToChangePasswordController {
    constructor(private mailToChangePasswordService: MailToChangePasswordService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('forgetPassword')
    mailToChangePassword(@Body() dto: ForgetPasswordDTO) {
      return this.mailToChangePasswordService.mailToChangePassword(dto);
    }
}
