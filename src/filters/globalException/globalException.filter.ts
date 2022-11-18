import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log();
    const responseMessage = (message) => {
      const exceptionMessage = exception.getResponse()['message'];
      response.status(status).json({
        statusCode: status,
        path: request.url,
        errorMessage: exceptionMessage ? exceptionMessage : message,
      });
    };

    const { error: errorString } =
      (exception.message as unknown as Record<string, string>) || {};

    if (errorString) {
      responseMessage(errorString);
    } else {
      responseMessage(exception.message);
    }
  }
}
