import { IsEmail } from 'class-validator';

export class ForgetPasswordDTO {
  @IsEmail()
  email: string;
}
