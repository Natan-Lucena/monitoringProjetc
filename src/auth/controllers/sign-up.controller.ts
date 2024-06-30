import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SignUpService } from '../services/sign-up.service';
import { CreateUserDTO } from '../dtos';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class SignUpController {
  constructor(private signUpService: SignUpService) {}
  @Post('signup')
  @ApiOperation({ summary: 'User Sign-Up' })
  @ApiBody({
    type: CreateUserDTO,
    description: 'Data required for user sign-up',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User signed up successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized: Invalid credentials',
  })
  async signUp(@Body() dto: CreateUserDTO) {
    return await this.signUpService.singUp(dto);
  }
}
