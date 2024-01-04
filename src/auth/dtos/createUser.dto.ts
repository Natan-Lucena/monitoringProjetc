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
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsBoolean()
  @IsNotEmpty()
  isMonitor: boolean;
  @IsBoolean()
  @IsNotEmpty()
  isProfessor: boolean;
  @IsString()
  @IsOptional()
  token: string;
}
