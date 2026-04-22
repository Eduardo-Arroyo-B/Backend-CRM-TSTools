import { IsString, IsBoolean, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuthDto {
  @IsString()
  usuario: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsBoolean()
  @Type(() => Boolean)
  activo: boolean;
}
