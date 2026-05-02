import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServicetypeDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
