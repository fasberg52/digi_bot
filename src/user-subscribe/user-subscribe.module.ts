import { Module } from '@nestjs/common';
import { UserSubscribeService } from './user-subscribe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscribeRepository } from './repository/subscribe-user.repository';
import { UserSubscribeController } from './user-subscribe.controller';
import { SubscribeRepository } from '../subscribe/repository/subscribe.repository';
import { ApiKeyService } from '../token/api-key.service';
import { ApikeyRepository } from '../token/repository/api-key.repository';
import { UserService } from '../users/users.service';
import { UserRepository } from '../users/repository/user.reopsitory';
import { DigikalaTokenRepository } from '/srcusers/repository/digikala-token.repository';

const repo = [
  UserSubscribeRepository,
  SubscribeRepository,
  ApikeyRepository,
  UserRepository,
  DigikalaTokenRepository,
];
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSubscribeRepository,
      SubscribeRepository,
      ApikeyRepository,
      UserRepository,
      DigikalaTokenRepository,
    ]),
  ],
  controllers: [UserSubscribeController],
  providers: [...repo, UserSubscribeService, ApiKeyService, UserService],
  exports: [UserSubscribeService, UserSubscribeRepository],
})
export class UserSubscribeModule {}
