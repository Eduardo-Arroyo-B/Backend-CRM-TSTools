import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConceptDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
