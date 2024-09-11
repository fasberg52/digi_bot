import { PickType } from '@nestjs/swagger';
import { TransactionEntity } from '../entity/transaction.entity';

export class CreateTransactionDto extends PickType(TransactionEntity, [
  'subscribeId',
  'userId',
]) {}
