import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entity/users.entity';
import { BaseResponse, Pagination } from '/srcshared/response/base-response';

@ApiExtraModels()
export class UserListResponse extends BaseResponse {
  @ApiProperty()
  result: UserEntity[];

  constructor(result: UserEntity[], total: number) {
    super();
    this.result = result;
    this.pagination = Pagination.set({ total });
  }
}
