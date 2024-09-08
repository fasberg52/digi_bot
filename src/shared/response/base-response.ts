import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  ResponseError,
  ResponseInterface,
  ResponseMessage,
} from '../response/response.interface';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiExtraModels()
export class BaseResponse implements ResponseInterface<any> {
  @ApiProperty()
  success: boolean = true;

  result: any;

  pagination: Pagination;

  error: ResponseError;

  @ApiProperty()
  snackbar: ResponseMessage;

  static getApiDoc(): ApiResponseOptions {
    return {
      description: this.name,
      type: this,
    };
  }
}

@ApiExtraModels()
export class Pagination {
  @ApiProperty()
  total: number;

  @ApiProperty()
  currentPage?: number;

  @ApiProperty()
  pageSize?: number;
  static set(props?: Partial<Pagination>) {
    const pagination = new Pagination();
    Object.assign(pagination, props);
    return pagination;
  }
}

@ApiExtraModels()
export class MessageResponse extends BaseResponse {
  constructor(message: string) {
    super();
    this.snackbar = {
      type: 'success',
      message: message,
    };
  }
}
@ApiExtraModels()
export class SuccessResponse extends BaseResponse {
  constructor() {
    super();
    this.success = true;
  }
}
