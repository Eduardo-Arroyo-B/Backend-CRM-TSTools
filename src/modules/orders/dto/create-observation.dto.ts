import { IsNotEmpty } from 'class-validator';

export class createObservationDto {
  @IsNotEmpty()
  observacion: string;
}
