import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateModelDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(30, { message: 'El nombre no puede exceder los 30 caracteres' })
  nombre: string;

  @Type(() => Number)
  @IsInt({ message: 'El brandId debe ser un número entero' })
  brandId: number;
}
