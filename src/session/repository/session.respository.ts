import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../shared/repository/base-repository';
import { DataSource } from 'typeorm';
import { SessionEntity } from '../entity/session.entity';

@Injectable()
export class SessionRepository extends BaseRepository<SessionEntity> {
  constructor(private dataSource: DataSource) {
    super(SessionEntity, dataSource.createEntityManager());
  }
  async getAll(userId: number): Promise<SessionEntity[]> {
    return this.find({
      where: {
        userId,
      },
      select: ['id', 'device', 'token'],
    });
  }
}
