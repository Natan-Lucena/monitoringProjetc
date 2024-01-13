import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ForgetPasswordDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsOptional()
  password?: string;
}
