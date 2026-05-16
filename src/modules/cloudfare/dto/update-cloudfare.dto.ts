import { PartialType } from '@nestjs/mapped-types';
import { CreateCloudfareDto } from './create-cloudfare.dto';

export class UpdateCloudfareDto extends PartialType(CreateCloudfareDto) {}
