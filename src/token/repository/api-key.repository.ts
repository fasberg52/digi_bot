import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/repository/base-repository';
import { DataSource } from 'typeorm';
import { ApiKeyEntity } from '../entity/api-key.entity';

@Injectable()
export class ApikeyRepository extends BaseRepository<ApiKeyEntity> {
  constructor(private dataSource: DataSource) {
    super(ApiKeyEntity, dataSource.createEntityManager());
  }
  //   async findOneUser(phone: string): Promise<ApiKeyEntity> {
  //     return await this.findOne({ where: { phone } });
  //   }

  //   async findOneUserByTelegram(telegramId: number): Promise<ApiKeyEntity> {
  //     return await this.findOne({ where: { telegramId } });
  //   }

  async createApikey(user: Partial<ApiKeyEntity>): Promise<ApiKeyEntity> {
    return this.save(user);
  }
}
