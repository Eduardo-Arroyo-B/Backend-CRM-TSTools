import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { estado } from '@prisma/client';

export class UpdateOrderStatusDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt({ message: 'clienteId debe ser un número entero' })
  tecnicoId: number;

  @IsNotEmpty()
  estado: estado;
}
