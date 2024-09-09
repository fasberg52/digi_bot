import { Injectable } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { SubscribeRepository } from './repository/subscribe.repository';

@Injectable()
export class SubscribeService {
  constructor(private readonly subscribeRepository: SubscribeRepository) {}

  async createSubscribe(createSubscribeDto: CreateSubscribeDto) {
    const subscribe = this.subscribeRepository.create(createSubscribeDto);
    return this.subscribeRepository.save(subscribe);
  }
}
