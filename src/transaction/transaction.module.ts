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

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    SubscribeRepository,
    ZarinpalService,
    ZarinpalGateway,
    UserSubscribeService,
    UserSubscribeRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      TransactionRepository,
      SubscribeRepository,
      UserSubscribeRepository,
    ]),
    HttpModule,
  ],
  exports: [],
})
export class TransactionModule {}
