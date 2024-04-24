import {
    Body,
    Controller,
    Post,
  } from '@nestjs/common';
  import { SignUpService } from '../services/sign-up.service';
  import { CreateUserDTO } from '../dtos';
  
  @Controller('auth')
  export class SignUpController {
    constructor(private signUpService: SignUpService) {}
  
    @Post('signup')
    signUp(@Body() dto: CreateUserDTO) {
      return this.signUpService.singUp(dto);
    }
  }