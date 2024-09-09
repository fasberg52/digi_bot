import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { BaseResponse, Pagination } from 'src/shared/response/base-response';
import { SubscribeEntity } from '../entity/subscribe.entity';

@ApiExtraModels()
export class SubscribeResponse extends BaseResponse {
  @ApiProperty()
  result: SubscribeEntity;

  constructor(user: SubscribeEntity) {
    super();
    this.result = user;
  }
}

@ApiExtraModels()
export class SubscribeListResponse extends BaseResponse {
  @ApiProperty()
  result: SubscribeEntity[];

  constructor(result: SubscribeEntity[], total: number) {
    super();
    this.result = result;
    this.pagination = Pagination.set({ total });
  }
}
