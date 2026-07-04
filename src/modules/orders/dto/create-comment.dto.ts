import { IsNotEmpty } from 'class-validator';

export class createCommentDto {
  @IsNotEmpty()
  comentarios: string;
}
