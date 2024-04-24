import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
  } from '@nestjs/common';
  import { SignInService } from '../services/sign-in.service';
  import { AuthDTO } from '../dtos';
  
  @Controller('auth')
  export class SignInController {
    constructor(private signInService: SignInService) {}
  
  
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    singIn(@Body() dto: AuthDTO) {
      return this.signInService.signIn(dto);
    }
}
