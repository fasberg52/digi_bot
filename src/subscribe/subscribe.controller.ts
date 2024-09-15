import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { MessageResponse } from '../shared/response/base-response';
import { SubscribeService } from './subscribe.service';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import {
  SubscribeListResponse,
  SubscribeResponse,
} from './response/subscribe.response';
import { getAllSubscribeDto } from './dto/get-all-subscribe.dto';

@Controller('subscribe')
@ApiTags('Subscribe')
@ApiBearerAuth()
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}
  @ApiCreatedResponse(MessageResponse.getApiDoc())
  @Post()
  async createSubscribe(
    @Body() createSubscribeDto: CreateSubscribeDto,
  ): Promise<MessageResponse> {
    const result =
      await this.subscribeService.createSubscribe(createSubscribeDto);
    console.log(result);

    return new MessageResponse('اشتراک ساخته شد');
  }

  @Get()
  async getAll(
    @Query() query: getAllSubscribeDto,
  ): Promise<SubscribeListResponse> {
    const [result, total] = await this.subscribeService.getAll(query);
    return new SubscribeListResponse(result, total);
  }

  @ApiOkResponse(SubscribeResponse.getApiDoc())
  @Get(':id')
  async getById(@Param('id') id: number): Promise<SubscribeResponse> {
    const result = await this.subscribeService.getById(id);

    return new SubscribeResponse(result);
  }

  @ApiOkResponse(MessageResponse.getApiDoc())
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubscribeDto: UpdateSubscribeDto,
  ): Promise<MessageResponse> {
    await this.subscribeService.putSubscribe(id, updateSubscribeDto);
    return new MessageResponse('اشتراک ویرایش شد');
  }
}
