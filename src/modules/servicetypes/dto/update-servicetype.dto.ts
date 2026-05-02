import { PartialType } from '@nestjs/mapped-types';
import { CreateServicetypeDto } from './create-servicetype.dto';

export class UpdateServicetypeDto extends PartialType(CreateServicetypeDto) {}
