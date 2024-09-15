import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../shared/repository/base-repository';
import { DataSource, EntityRepository } from 'typeorm';
import { TransactionEntity } from '../entity/transaction.entity';

@Injectable()
export class TransactionRepository extends BaseRepository<TransactionEntity> {
  constructor(private dataSource: DataSource) {
    super(TransactionEntity, dataSource.createEntityManager());
  }
}
