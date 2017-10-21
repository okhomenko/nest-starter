import { HttpStatus, Pipe } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces/pipe-transform.interface';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/core';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {

    async transform(value, metadata: ArgumentMetadata) {

        const { metatype } = metadata;

        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length !== 0) {
            throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
        } else {
            return value;
        }

    }

    toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];

        return !types.find(type => metatype === type);
    }

}