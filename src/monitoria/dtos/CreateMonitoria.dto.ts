import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateMonitoriaDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Matemática Discreta',
    description: `O nome da cadeira que será exibido em várias partes da aplicação.`,
    required: true,
    type: 'string',
  })
  cadeiraName: string;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2024-04-30T09:13:00.000Z',
    description: `O horário que inicará a monitoria para a cadeira`,
    required: true,
    type: 'Date',
  })
  horarioInicio: Date;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2024-04-30T09:15:00.000Z',
    description: `O horário que a aula da monitoria irá finalizar`,
    required: true,
    type: 'Date',
  })
  horarioFim: Date;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Sala 04',
    description: `Sala onde ocorrerá a monitoria`,
    required: true,
    type: 'string',
  })
  sala: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'O conteúdo abordado no dia da Monitoria foi Indução Matemática',
    description: `Observações adicionais relacionadas à monitoria`,
    required: false,
    type: 'string',
  })
  obs?: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'MDC2024',
    description: `Identificador único da cadeira, usado para referenciar a disciplina em sistemas e bancos de dados.`,
    required: true,
    type: 'string',
  })
  idCadeira: string;
}
