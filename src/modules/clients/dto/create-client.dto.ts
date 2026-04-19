import { IsString, IsEnum, IsUUID } from 'class-validator';
import { clientType } from '@prisma/client';

export class CreateClientDto {
  @IsString()
  nombre: string;

  @IsString()
  telefono: string;

  @IsString()
  segundoTelefono: string;

  @IsString()
  direccion: string;

  @IsEnum(clientType as object)
  tipo: clientType;

  @IsUUID()
  creador: string;
}
