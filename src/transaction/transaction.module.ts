import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './repository/transaction.repository';
import { SubscribeRepository } from '../subscribe/repository/subscribe.repository';
import { ZarinpalService } from '../payment/zarinpal/zarinpal.service';
import { ZarinpalGateway } from '../payment/gateway/zarinpal.gateway';
import { UserSubscribeService } from '../user-subscribe/user-subscribe.service';
import { UserSubscribeRepository } from '../user-subscribe/repository/subscribe-user.repository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ApiKeyService } from '../token/api-key.service';
import { ApikeyRepository } from '../token/repository/api-key.repository';
import { UserService } from '../users/users.service';
import { UserRepository } from '../users/repository/user.reopsitory';
import { DigikalaTokenRepository } from '/srcusers/repository/digikala-token.repository';

const repo = [
  TransactionRepository,
  SubscribeRepository,
  UserSubscribeRepository,
  ApikeyRepository,
  UserRepository,
  DigikalaTokenRepository,
];
@Module({
  controllers: [TransactionController],
  providers: [
    ...repo,
    TransactionService,
    ZarinpalService,
    ZarinpalGateway,
    UserSubscribeService,
    ApiKeyService,
    UserService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      TransactionRepository,
      SubscribeRepository,
      UserSubscribeRepository,
      ApikeyRepository,
      DigikalaTokenRepository,
    ]),
    HttpModule,
  ],
  exports: [],
})
export class TransactionModule {}
