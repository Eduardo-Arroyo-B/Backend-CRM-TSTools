import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'nombre debe ser texto' })
  @IsNotEmpty({ message: 'nombre es obligatorio' })
  nombre: string;

  @IsString({ message: 'sku debe ser texto' })
  @IsNotEmpty({ message: 'sku es obligatorio' })
  sku: string;

  @IsOptional()
  @IsString({ message: 'descripcion debe ser texto' })
  descripcion?: string;

  @IsOptional()
  @IsString({ message: 'categoria debe ser texto' })
  categoria?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'costo debe ser un número con máximo dos decimales' },
  )
  @Min(0, { message: 'costo no puede ser negativo' })
  costo?: number;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'precio_publico debe ser un número con máximo dos decimales' },
  )
  @Min(0, { message: 'precio_publico no puede ser negativo' })
  precio_publico: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'precio_mayorista debe ser un número con máximo dos decimales' },
  )
  @Min(0, { message: 'precio_mayorista no puede ser negativo' })
  precio_mayorista?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'stock debe ser un número entero' })
  @Min(0, { message: 'stock no puede ser negativo' })
  stock?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'stockMinimo debe ser un número entero' })
  @Min(0, { message: 'stockMinimo no puede ser negativo' })
  stockMinimo?: number;

  @IsOptional()
  @IsBoolean({ message: 'activo debe ser booleano' })
  activo?: boolean;

  @IsOptional()
  @IsString({ message: 'imagenURL debe ser texto' })
  imagenURL?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'marcaId debe ser un número entero' })
  marcaId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'modeloId debe ser un número entero' })
  modeloId?: number | null;
}
