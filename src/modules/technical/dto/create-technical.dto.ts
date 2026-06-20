import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnicalDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
