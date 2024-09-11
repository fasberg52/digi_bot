import { Module } from '@nestjs/common';
import { UserSubscribeService } from './user-subscribe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscribeRepository } from './repository/subscribe-user.repository';
import { UserSubscribeController } from './user-subscribe.controller';
import { SubscribeRepository } from 'src/subscribe/repository/subscribe.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSubscribeRepository, SubscribeRepository]),
  ],
  controllers: [UserSubscribeController],
  providers: [
    UserSubscribeService,
    UserSubscribeRepository,
    SubscribeRepository,
  ],
  exports: [UserSubscribeService, UserSubscribeRepository],
})
export class UserSubscribeModule {}
