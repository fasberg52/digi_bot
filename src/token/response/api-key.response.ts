import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../shared/response/base-response';

@ApiExtraModels()
export class CheckApiResponse extends BaseResponse {
  @ApiProperty()
  result: any;

  constructor(result: any) {
    super();
    this.result = result;
  }
}
