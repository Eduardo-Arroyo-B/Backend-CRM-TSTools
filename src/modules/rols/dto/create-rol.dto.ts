import { ArrayUnique, IsArray, IsIn, IsString, MinLength } from 'class-validator';
import { PERMISSIONS } from '../../../common/auth/permissions';

export class CreateRolDto {
  @IsString() @MinLength(3) nombre: string;
  @IsArray() @ArrayUnique() @IsIn(PERMISSIONS, { each: true }) permisos: string[];
}
