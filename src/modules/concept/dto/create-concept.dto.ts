import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConceptDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  serviceTypeId: number;
}
