import { Body, Controller, Post } from '@nestjs/common';
import { UserSubscribeService } from './user-subscribe.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserSubscribeDto } from './dto/create-user-subscribe';

@ApiTags('User Subscribe')
@Controller('user-subscribe')
export class UserSubscribeController {
  constructor(private readonly userSubscribeService: UserSubscribeService) {}
  @Post()
  async createSubscribe(
    @Body() createUserSubscribeDto: CreateUserSubscribeDto,
  ) {
    return this.userSubscribeService.createSubscribe(
      createUserSubscribeDto.userId,
      createUserSubscribeDto.subscriptionId,
    );
  }
}
