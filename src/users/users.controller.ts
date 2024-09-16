import { Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { getAllQuery } from '/srcshared/dto/query.dto';
import { UserListResponse } from './response/users.response';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @ApiOkResponse(UserListResponse.getApiDoc())
  @Get('all')
  async getAllUsers(@Query() query: getAllQuery): Promise<UserListResponse> {
    const [result, total] = await this.usersService.getAllUsers(query);
    return new UserListResponse(result, total);
  }
}
