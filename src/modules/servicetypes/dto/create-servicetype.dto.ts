import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServicetypeDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion: string;

  @Type(() => Boolean)
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsBoolean({ message: 'El estado debe ser un valor booleano' })
  activo: boolean;
}
