import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServicesGlobalDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  precio: number;

  @IsString()
  @IsNotEmpty()
  tiempoProceso: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  incluye: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  compatibilidad: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requisitos?: string[];
}
