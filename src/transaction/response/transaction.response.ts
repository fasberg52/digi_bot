import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { BaseResponse, Pagination } from '../../shared/response/base-response';
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

@ApiExtraModels()
export class TransactionListResponse extends BaseResponse {
  @ApiProperty()
  result: TransactionEntity[];

  constructor(result: TransactionEntity[], total: number) {
    super();
    this.result = result;
    this.pagination = Pagination.set({ total });
  }
}
