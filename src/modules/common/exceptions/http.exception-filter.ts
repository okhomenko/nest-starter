import { Catch } from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions';
import { HttpException } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, response) {

        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                message: `It's a message from the exception filter`,
            });

    }

}