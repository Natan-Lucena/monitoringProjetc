import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
  } from '@nestjs/common';
import { MailToChangePasswordService } from '../services/mail-to-change-password.service';
import { ForgetPasswordDTO } from '../dtos';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guard';
  
@ApiTags('auth')
@Controller('auth')
@UseGuards(JwtGuard)
export class MailToChangePasswordController {
  constructor(private mailToChangePasswordService: MailToChangePasswordService) {}
  
  @HttpCode(HttpStatus.OK)
  @Post('forgetPassword')
  @ApiOperation({ summary: 'Send password change email' })
  @ApiBody({
    type: ForgetPasswordDTO,
    description: 'Data required to send password change email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password change email sent successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized: Invalid or expired authentication token',
  })
  mailToChangePassword(@Body() dto: ForgetPasswordDTO) {
      return this.mailToChangePasswordService.mailToChangePassword(dto);
  }
}
