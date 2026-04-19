import { IsOptional, IsString, MinLength, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAuthDto {
  @IsOptional()
  @IsString()
  usuario?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser un booleano' })
  @Type(() => Boolean)
  activo?: boolean;
}
