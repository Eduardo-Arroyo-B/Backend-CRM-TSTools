import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString() @MinLength(3) usuario: string;
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsBoolean() @IsOptional() activo?: boolean;
  @IsUUID() roleId: string;
}
