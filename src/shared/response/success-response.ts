// ../../common/response/success-response.ts
import { ApiExtraModels } from '@nestjs/swagger';
import { BaseResponse } from './base-response';

@ApiExtraModels()
export class SuccessResponse extends BaseResponse {
  constructor() {
    super();
    this.success = true;
  }
}
