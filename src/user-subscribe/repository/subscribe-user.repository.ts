import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/repository/base-repository';
import { DataSource } from 'typeorm';
import { SubscribeUserEntity } from '../entity/subscribe-user.entity';

@Injectable()
export class UserSubscribeRepository extends BaseRepository<SubscribeUserEntity> {
  constructor(private dataSource: DataSource) {
    super(SubscribeUserEntity, dataSource.createEntityManager());
  }
}
