import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ForgetPasswordDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'exemplo123@gmail.com',
    description: `O endereço de e-mail do usuário para redefinição de senha.`,
    required: true,
    type: 'string',
  })
  email: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Exemplonew123@',
    description: `A nova senha desejada pelo usuário.`,
    required: false,
    type: 'string',
  })
  password?: string;
}
