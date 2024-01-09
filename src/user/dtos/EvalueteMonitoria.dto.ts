import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EvalueteMonitoriaDTO {
  @IsNotEmpty()
  @IsNumber()
  avaliacao: number;
  @IsNotEmpty()
  @IsString()
  idMonitoria: string;
}
