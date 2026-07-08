import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PayOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  monto: number;
}
