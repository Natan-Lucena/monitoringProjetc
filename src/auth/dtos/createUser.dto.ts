import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'João da Silva',
    description: `O nome do usuário`,
    required: true,
    type: 'string',
  })
  name: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'exemplo123@gmail.com',
    description: `O endereço de e-mail do usuário.`,
    required: true,
    type: 'string',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Exemplo123@',
    description: `A senha do usuário.`,
    required: true,
    type: 'string',
  })
  password: string;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: 'sim',
    description: `Indica se o usuário é um monitor.`,
    required: true,
    type: 'boolean',
  })
  isMonitor: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: 'não',
    description: `Indica se o usuário é um professor.`,
    required: true,
    type: 'boolean',
  })
  isProfessor: boolean;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: `O token de autenticação do usuário, se aplicável.`,
    required: false,
    type: 'string',
  })
  token: string;
}
