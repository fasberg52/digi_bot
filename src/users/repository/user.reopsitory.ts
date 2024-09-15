import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/users.entity';
import { BaseRepository } from '../../shared/repository/base-repository';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findOneUser(id: number): Promise<UserEntity> {
    return await this.findOne({ where: { id } });
  }

  async findOneUserByTelegram(telegramId: number): Promise<UserEntity> {
    return await this.findOne({ where: { telegramId } });
  }

  async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    return this.save(user);
  }
}
