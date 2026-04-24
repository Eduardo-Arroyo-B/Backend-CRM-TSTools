import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  equipo: string;

  @IsString()
  @IsNotEmpty()
  concepto: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  marcaId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  modeloId: number;

  @IsString()
  @IsNotEmpty()
  garantia: string;

  @IsString()
  @IsNotEmpty()
  precio_publico: string;

  @IsString()
  @IsNotEmpty()
  precio_mayorista: string;
}
