import { IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @IsString({ message: 'La marca debe ser una cadena de texto' })
  @MinLength(2, { message: 'La marca debe tener al menos 2 caracteres' })
  marca: string;
}
