import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './repository/transaction.repository';
import { SubscribeRepository } from 'src/subscribe/repository/subscribe.repository';
import { ZarinpalService } from 'src/payment/zarinpal/zarinpal.service';
import { ZarinpalGateway } from 'src/payment/gateway/zarinpal.gateway';
import { UserSubscribeService } from 'src/user-subscribe/user-subscribe.service';
import { UserSubscribeRepository } from 'src/user-subscribe/repository/subscribe-user.repository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ApiKeyService } from 'src/token/api-key.service';
import { ApikeyRepository } from 'src/token/repository/api-key.repository';
import { UserService } from 'src/users/users.service';
import { UserRepository } from 'src/users/repository/user.reopsitory';

const repo = [
  TransactionRepository,
  SubscribeRepository,
  UserSubscribeRepository,
  ApikeyRepository,
  UserRepository,
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
    ]),
    HttpModule,
  ],
  exports: [],
})
export class TransactionModule {}
