import {
    Body,
    Controller,
    Patch,
  } from '@nestjs/common';
  import { ChangePasswordService } from '../services/change-password.service';
  import { ForgetPasswordDTO } from '../dtos';
  
  @Controller('auth')
  export class ChangePasswordController {
    constructor(private changePasswordService: ChangePasswordService) {}
  
    @Patch('forgetPassword')
    changePassword(@Body() dto: ForgetPasswordDTO) {
      return this.changePasswordService.changePassword(dto);
    }
  }