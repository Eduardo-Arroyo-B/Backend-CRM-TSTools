import { IsString, IsInt, IsUUID, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateModelDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre: string;

  @IsUUID('4', { message: 'El usuarioId debe ser un UUID válido' })
  usuarioId: string;

  @IsInt({ message: 'El brandId debe ser un número entero' })
  @Type(() => Number)
  brandId: number;
}
