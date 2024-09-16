import { Injectable } from '@nestjs/common';
import { BaseRepository } from '/srcshared/repository/base-repository';
import { DigikalaTokenEntity } from '../entity/digikala-token.users.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DigikalaTokenRepository extends BaseRepository<DigikalaTokenEntity> {
  constructor(private dataSource: DataSource) {
    super(DigikalaTokenEntity, dataSource.createEntityManager());
  }
}
