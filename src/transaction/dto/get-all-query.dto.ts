import { ApiPropertyOptional } from '@nestjs/swagger';
import { getAllQuery } from '/srcshared/dto/query.dto';
import { TransactionStatus } from '../enums/transaction.enum';
import { IsEnum } from 'class-validator';

export class getAllQueryTransaction extends getAllQuery {
  @ApiPropertyOptional({ enum: TransactionStatus })
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
