import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../shared/repository/base-repository';
import { DataSource } from 'typeorm';
import { SubscribeUserEntity } from '../entity/subscribe-user.entity';

@Injectable()
export class UserSubscribeRepository extends BaseRepository<SubscribeUserEntity> {
  constructor(private dataSource: DataSource) {
    super(SubscribeUserEntity, dataSource.createEntityManager());
  }

  async findOneSubscribeUser(id: number): Promise<SubscribeUserEntity> {
    return await this.findOne({ where: { id } });
  }
}
