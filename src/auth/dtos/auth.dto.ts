import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'exemplo123@gmail.com',
    description: `O endereço de e-mail do usuário para realizar o login.`,
    required: true,
    type: 'string',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Exemplo123@',
    description: `A senha do usuário para realizar o login`,
    required: true,
    type: 'string',
  })
  password: string;
}
