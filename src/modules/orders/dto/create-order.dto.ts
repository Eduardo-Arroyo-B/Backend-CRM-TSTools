import {
  IsInt,
  IsString,
  IsPositive,
  Min,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
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

  @IsInt({ message: 'servicioId debe ser un número entero' })
  @IsPositive({ message: 'servicioId debe ser mayor a 0' })
  @IsNotEmpty({ message: 'servicioId no puede estar vacío' })
  @Type(() => Number)
  servicioId: number;

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
    message: 'El estado del pago debe ser: PENDIENTE, DEBE, PAGADO o SINCOSTO',
  })
  @IsNotEmpty({ message: 'estado_pago no puede estar vacío' })
  estado_pago: estadoPago;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcion?: string;

  // =========================
  // DATOS DEL EQUIPO
  // =========================

  @IsOptional()
  @IsString({ message: 'IMEI debe ser texto' })
  imei?: string;

  @IsOptional()
  @IsBoolean({ message: 'enciende debe ser booleano' })
  enciende?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'bateria debe ser booleano' })
  bateria?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'bandejaSim debe ser booleano' })
  bandejaSim?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'golpes debe ser booleano' })
  golpes?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'mojado debe ser booleano' })
  mojado?: boolean;

  @IsOptional()
  @IsString({ message: 'La contraseña debe ser texto' })
  contrasena?: string;

  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser texto' })
  observaciones?: string;

  // =========================
  // COMERCIAL
  // =========================

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'garantia debe ser número' })
  garantia?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'pago debe ser número' })
  pago?: number;
}
