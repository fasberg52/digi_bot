import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../shared/repository/base-repository';
import { SubscribeEntity } from '../entity/subscribe.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class SubscribeRepository extends BaseRepository<SubscribeEntity> {
  constructor(private dataSource: DataSource) {
    super(SubscribeEntity, dataSource.createEntityManager());
  }
}
