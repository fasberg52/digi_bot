import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './repository/transaction.repository';
import { SubscribeRepository } from 'src/subscribe/repository/subscribe.repository';
import { ZarinpalService } from 'src/payment/zarinpal/zarinpal.service';
import { ZarinpalGateway } from 'src/payment/gateway/zarinpal.gateway';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    SubscribeRepository,
    ZarinpalService,
    ZarinpalGateway,
  ],
  imports: [
    TypeOrmModule.forFeature([TransactionRepository, SubscribeRepository]),
  ],
})
export class TransactionModule {}
