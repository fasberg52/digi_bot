import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export interface ResponseInterface<T> {
  success: boolean;
  result?: T;
  error?: ResponseError;
  snackbar: ResponseMessage;
}

@ApiExtraModels()
export class ResponseMessage {
  @ApiProperty()
  type: 'error' | 'success' | 'info' | 'warning';

  @ApiProperty()
  message: string | string[];
}

@ApiExtraModels()
export class ResponseError {
  @ApiProperty()
  code: number;

  @ApiProperty()
  httpCode: number;

  @ApiProperty()
  message: string | string[];
}

export class ErrorPayloadInterface {
  module: number;
  errorNumber: string;
  httpCode: number;
  message?: string | string[];
  params?: Record<string, any>;
}
