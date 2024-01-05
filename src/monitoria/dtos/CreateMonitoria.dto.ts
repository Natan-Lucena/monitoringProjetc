import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateMonitoriaDTO {
  @IsString()
  @IsNotEmpty()
  cadeiraName: string;
  @IsDateString()
  @IsNotEmpty()
  horarioInicio: Date;
  @IsDateString()
  @IsNotEmpty()
  horarioFim: Date;
  @IsString()
  @IsNotEmpty()
  sala: string;
  @IsString()
  @IsOptional()
  obs?: string;
}
