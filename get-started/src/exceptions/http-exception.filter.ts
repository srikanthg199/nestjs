import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from 'src/utils/response.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    // Extract error message from the exception response
    const exceptionResponse = exception.getResponse();
    const message = exceptionResponse?.message || exception.message;
    const errorMessages = Array.isArray(message) ? message[0] : message;

    console.log(/ex/, exception);

    // Send a structured error response
    sendResponse(response, null, errorMessages, status, false);
  }
}
