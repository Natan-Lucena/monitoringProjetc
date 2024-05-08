import {
    Body,
    Controller,
    HttpStatus,
    Patch,
    UseGuards,
  } from '@nestjs/common';
import { ChangePasswordService } from '../services/change-password.service';
import { ForgetPasswordDTO } from '../dtos';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guard';
  
@ApiTags('auth')
@Controller('auth')
@UseGuards(JwtGuard)
export class ChangePasswordController {
  constructor(private changePasswordService: ChangePasswordService) {}
  
  @Patch('forgetPassword')
  @ApiOperation({ summary: 'Change Password' })
  @ApiBody({
    type: ForgetPasswordDTO,
    description: 'Data to change user password',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password changed successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid authentication token',
  })
  changePassword(@Body() dto: ForgetPasswordDTO) {
      return this.changePasswordService.changePassword(dto);
  }
}