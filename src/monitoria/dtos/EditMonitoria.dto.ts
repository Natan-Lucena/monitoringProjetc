import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class EditMonitoriaDTO {
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    example: '2024-04-30T09:10:00.000Z',
    description: `Nova data e hora de início da monitoria, se aplicável.`,
    required: false,
    type: 'Date',
  })
  horarioInicio?: Date;
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    example: '2024-04-30T18:12:00.000Z',
    description: `Nova data e hora de término da monitoria, se aplicável.`,
    required: false,
    type: 'Date',
  })
  horarioFim?: Date;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Sala 03',
    description: `Novo local onde ocorrerá a monitoria, se aplicável.`,
    required: false,
    type: 'string',
  })
  sala?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'O conteúdo abordado no dia da Monitoria foi Recursão Matemática.',
    description: `Novas observações adicionais relacionadas à monitoria, se aplicável.`,
    required: false,
    type: 'string',
  })
  obs?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Matemática Básica',
    description: `Novo nome da cadeira relacionada à monitoria, se aplicável.`,
    required: false,
    type: 'string',
  })
  cadeiraName?: string;
}
