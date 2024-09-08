import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TelegramProfileDto } from './dto/login-telegram.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessResponse } from 'src/shared/response/base-response';
import { TelegramStrategy } from './strategy/telegram.strategy';

@ApiTags('auth')
@ApiBearerAuth()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(TelegramStrategy)
  @ApiOkResponse(SuccessResponse.getApiDoc())
  @Post('telegram/login')
  async loginTelegram(@Body() profile: TelegramProfileDto) {
    return await this.authService.loginTelegram(profile);
  }
}
