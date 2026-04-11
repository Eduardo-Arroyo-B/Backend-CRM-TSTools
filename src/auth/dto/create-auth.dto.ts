import {
  IsString,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuthDto {
  @IsString()
  usuario: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsBoolean()
  activo: boolean;

  @IsDate()
  @Type(() => Date)
  ultimo_login: Date;

  @IsInt()
  login_intentos: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  bloqueado_hasta: Date;
}
