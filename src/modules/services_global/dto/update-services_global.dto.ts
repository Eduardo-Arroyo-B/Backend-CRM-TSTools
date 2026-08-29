import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesGlobalDto } from './create-services_global.dto';

export class UpdateServicesGlobalDto extends PartialType(CreateServicesGlobalDto) {}
