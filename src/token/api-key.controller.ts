import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyService } from './api-key.service';
import { Check } from 'typeorm';
import { CheckApiResponse } from './response/api-key.response';
import { CheckApiKeyDto } from './dto/check-api-key.dto';

@Controller('api-key')
@ApiTags('Api Key')
@ApiBearerAuth()
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}
  @ApiOkResponse(CheckApiResponse.getApiDoc())
  @ApiProperty()
  @Post('check-api-key')
  async checkApikey(
    @Body() checkApiKeyDto: CheckApiKeyDto,
  ): Promise<CheckApiResponse> {
    const result = await this.apiKeyService.checkApikey(checkApiKeyDto.apiKey);
    return new CheckApiResponse(result);
  }
}
