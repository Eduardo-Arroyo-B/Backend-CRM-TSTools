import { IsString, IsEnum, MinLength, MaxLength } from 'class-validator';
import { clientType } from '@prisma/client';

export class CreateClientDto {
  @IsString({ message: 'Es necesario ingresar un nombre' })
  nombre: string;

  @MinLength(10, { message: 'El numero debe ser de 10 caracteres' })
  @MaxLength(10, { message: 'El numero no puede tener mas de 10 caracteres' })
  @IsString({ message: 'Es necesario ingresar un telefono' })
  telefono: string;

  @IsString({
    message: 'El segundo telefono debe ser string un segundo telefono',
  })
  @MinLength(10, { message: 'El numero debe ser de 10 caracteres' })
  @MaxLength(10, { message: 'El numero no puede tener mas de 10 caracteres' })
  segundoTelefono?: string;

  @IsString({ message: 'Es necesario ingresar una direccion' })
  direccion: string;

  @IsEnum(clientType as object)
  tipo: clientType;
}
