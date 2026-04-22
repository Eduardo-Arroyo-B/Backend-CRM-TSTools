import {
  IsInt,
  IsString,
  IsPositive,
  Min,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { estadoPago, estado } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsInt({ message: 'clienteId debe ser un número entero' })
  @IsNotEmpty({ message: 'clienteId no puede estar vacío' })
  @Type(() => Number)
  clienteId: number;

  @IsInt({ message: 'marcaId debe ser un número entero' })
  @IsPositive({ message: 'marcaId debe ser mayor a 0' })
  @IsNotEmpty({ message: 'marcaId no puede estar vacío' })
  @Type(() => Number)
  marcaId: number;

  @IsInt({ message: 'modeloId debe ser un número entero' })
  @IsPositive({ message: 'modeloId debe ser mayor a 0' })
  @IsNotEmpty({ message: 'modeloId no puede estar vacío' })
  @Type(() => Number)
  modeloId: number;

  @IsString({ message: 'estado debe ser un texto' })
  @IsEnum(estado, {
    message: 'estado debe ser: PENDIENTE, ENPROCESO, REPARADO',
  })
  @IsNotEmpty({ message: 'estado no puede estar vacío' })
  estado: estado;

  @IsInt({ message: 'total debe ser un número entero' })
  @Min(0, { message: 'total no puede ser negativo' })
  @IsNotEmpty({ message: 'total no puede estar vacío' })
  @Type(() => Number)
  total: number;

  @IsString({ message: 'El estado de pago debe ser un texto' })
  @IsEnum(estadoPago, {
    message: 'El estado del pago debe ser: PEDIENTE, DEBE, PAGADO o SINCOSTO',
  })
  @IsNotEmpty({ message: 'estado_pago no puede estar vacío' })
  estado_pago: estadoPago;

  @IsOptional()
  @IsString({ message: 'El comentario debe ser un texto' })
  descripcion?: string;
}
