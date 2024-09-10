import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/shared/response/base-response';
import { TransactionEntity } from '../entity/transaction.entity';

@ApiExtraModels()
export class TransactionResponse extends BaseResponse {
  @ApiProperty()
  result: any;

  constructor(result: any) {
    super();
    this.result = result;
  }
}
