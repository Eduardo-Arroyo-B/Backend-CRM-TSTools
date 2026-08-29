import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function validationExceptionFactory(errors: ValidationError[]) {
  return new BadRequestException({
    statusCode: 400,
    error: 'Validation Error',
    message: 'Uno o más campos son inválidos',
    fields: errors.map((validationError) => ({
      field: validationError.property,
      messages: Object.values(validationError.constraints ?? {}),
    })),
  });
}
