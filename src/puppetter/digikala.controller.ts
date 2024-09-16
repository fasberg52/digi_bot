import { Controller, Post, Body, Logger, Get } from '@nestjs/common';
import { DigikalaLoginService } from './digikala.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DigikalaPhone } from './dto/login-start.dto';
import { DigikalaOtp } from './dto/login-otp.dto';

@Controller('digikala')
@ApiTags('Digikala')
export class DigikalaLoginController {
  private readonly logger = new Logger(DigikalaLoginController.name);

  constructor(private readonly digikalaLoginService: DigikalaLoginService) {}

  @ApiOkResponse()
  @Post('login')
  async login(): Promise<string> {
    try {
      const result = await this.digikalaLoginService.loginToDigikala();
      return result;
    } catch (error) {
      throw new Error('Failed to login to Digikala');
    }
  }
}
