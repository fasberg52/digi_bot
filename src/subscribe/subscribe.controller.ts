import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { MessageResponse } from 'src/shared/response/base-response';
import { SubscribeService } from './subscribe.service';

@Controller('subscribe')
@ApiTags('Subscribe')
@ApiBearerAuth()
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}
  @ApiCreatedResponse(MessageResponse.getApiDoc())
  @Post()
  async createSubscribe(@Body() createSubscribeDto: CreateSubscribeDto) {
    const result =
      await this.subscribeService.createSubscribe(createSubscribeDto);
    console.log(result);

    return new MessageResponse('اشتراک ساخته شد');
  }
}
