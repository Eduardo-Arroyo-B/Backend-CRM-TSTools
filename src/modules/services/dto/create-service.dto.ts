import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServiceDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  tipo_servicio: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  equipoId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  conceptoId: number;

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
