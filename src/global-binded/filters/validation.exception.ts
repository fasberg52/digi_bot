import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponse } from '../../shared/response/base-response';
import { ResponseError } from '../../shared/response/response.interface';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ResponseError = {
      code: exception?.response?.['code'] || -1,
      httpCode: status,
      message: exception?.response?.['message'] || 'Internal server error',
    };

    const baseResponse: BaseResponse = {
      success: false,
      result: null,
      pagination: null,
      error: errorResponse,
      snackbar: {
        type: 'error',
        message: errorResponse.message,
      },
    };

    httpAdapter.reply(response, baseResponse, status);
  }
}
