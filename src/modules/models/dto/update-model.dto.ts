import {
  IsOptional,
  IsString,
  IsInt,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UpdateModelDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre?: string;

  @IsOptional()
  @IsUUID('4', { message: 'El usuarioId debe ser un UUID válido' })
  usuarioId?: string;

  @IsOptional()
  @IsInt({ message: 'El brandId debe ser un número entero' })
  brandId?: number;
}
