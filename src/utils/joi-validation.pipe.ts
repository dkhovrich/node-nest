import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private scheme: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.scheme.validate(value);
    if (error !== undefined) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }
}
