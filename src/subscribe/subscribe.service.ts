import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { SubscribeRepository } from './repository/subscribe.repository';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { SubscribeEntity } from './entity/subscribe.entity';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Like,
} from 'typeorm';
import { getAllSubscribeDto } from './dto/get-all-subscribe.dto';

@Injectable()
export class SubscribeService {
  constructor(private readonly subscribeRepository: SubscribeRepository) {}

  async createSubscribe(createSubscribeDto: CreateSubscribeDto) {
    const subscribe = this.subscribeRepository.create(createSubscribeDto);
    return this.subscribeRepository.save(subscribe);
  }

  async putSubscribe(
    id: number,
    updateSubscribeDto: UpdateSubscribeDto,
  ): Promise<SubscribeEntity> {
    const existingSubscribe = await this.subscribeRepository.findOneBy({ id });
    if (!existingSubscribe) {
      throw new NotFoundException(`اشتراک با شناسه ${id} پیدا نشد`);
    }

    const updatedSubscribe = this.subscribeRepository.merge(
      existingSubscribe,
      updateSubscribeDto,
    );

    return this.subscribeRepository.save(updatedSubscribe);
  }

  async getById(id: number): Promise<SubscribeEntity> {
    const subscribe = await this.subscribeRepository.findOneBy({ id });
    if (!subscribe) {
      throw new NotFoundException(`اشتراک با شناسه ${id} پیدا نشد`);
    }
    return subscribe;
  }

  async getAll(
    query: getAllSubscribeDto,
  ): Promise<[SubscribeEntity[], number]> {
    const { id, search, sortBy, sortOrder, page = 1, limit = 10 } = query;

    const where: FindOptionsWhere<SubscribeEntity> = {};

    if (id) {
      where.id = id;
    }

    if (search) {
      where.title = Like(`%${search}%`);
    }

    const order: FindOptionsOrder<SubscribeEntity> = {};
    if (sortBy) {
      order[sortBy] = sortOrder === 'ASC' ? 'ASC' : 'DESC';
    } else {
      order['id'] = 'DESC';
    }

    const findOptions: FindManyOptions<SubscribeEntity> = {
      where,
      order,
      skip: (page - 1) * limit,
      take: limit,
    };

    const [result, total] =
      await this.subscribeRepository.findAndCount(findOptions);

    return [result, total];
  }
}
