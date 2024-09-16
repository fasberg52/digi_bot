import { Module } from '@nestjs/common';
import { DigikalaLoginController } from './digikala.controller';
import { DigikalaLoginService } from './digikala.service';

@Module({
  imports: [],
  controllers: [DigikalaLoginController],
  providers: [DigikalaLoginService],
})
export class DigikalaModule {}
