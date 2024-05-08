import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
  } from '@nestjs/common';
import { SignInService } from '../services/sign-in.service';
import { AuthDTO } from '../dtos';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guard';

@ApiTags('auth')
@Controller('auth')
@UseGuards(JwtGuard)
export class SignInController {
  constructor(private signInService: SignInService) {}
  
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({ summary: 'User Sign-In' })
  @ApiBody({
    type: AuthDTO,
    description: 'Data required for user sign-in',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User signed in successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized: Invalid credentials',
  })
  singIn(@Body() dto: AuthDTO) {
    return this.signInService.signIn(dto);
  }
}
