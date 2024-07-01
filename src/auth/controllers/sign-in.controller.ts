import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInService } from '../services/sign-in.service';
import { AuthDTO } from '../dtos';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
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
  async singIn(@Body() dto: AuthDTO) {
    return await this.signInService.signIn(dto);
  }
}
