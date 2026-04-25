import { IsString, IsBoolean, MinLength, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuthDto {
  @IsString()
  usuario: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  @Type(() => Boolean)
  activo: boolean;
}
