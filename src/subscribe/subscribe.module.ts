import { Module } from '@nestjs/common';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribeRepository } from './repository/subscribe.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubscribeRepository])],
  controllers: [SubscribeController],
  providers: [SubscribeService, SubscribeRepository],
  exports: [],
})
export class SubscribeModule {}
