import { IsDateString, IsOptional, IsString } from 'class-validator';

export class EditMonitoriaDTO {
  @IsDateString()
  @IsOptional()
  horarioInicio?: Date;
  @IsDateString()
  @IsOptional()
  horarioFim?: Date;
  @IsString()
  @IsOptional()
  sala?: string;
  @IsString()
  @IsOptional()
  obs?: string;
  @IsString()
  @IsOptional()
  cadeiraName?: string;
}
