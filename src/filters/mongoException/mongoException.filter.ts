import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Mongo DB');

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    switch (exception.code) {
      case 11000 || 11001:
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          path: request.url,
          errorMessage:
            Object.keys(exception['keyPattern'])[0] + ' is already registered',
        });
        break;

      default:
        this.logger.log(
          'Database error Code:' +
            exception.code +
            ' Message:' +
            exception.message,
        );
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 500,
          path: request.url,
          errorMessage: 'Internal Server Error',
        });
        break;
    }
  }
}
