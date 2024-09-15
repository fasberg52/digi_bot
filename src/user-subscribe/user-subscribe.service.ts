import { Injectable } from '@nestjs/common';
import { CreateUserSubscribeDto } from './dto/create-user-subscribe';
import { UserSubscribeRepository } from './repository/subscribe-user.repository';
import * as moment from 'moment-jalaali';
import { SubscribeRepository } from '../subscribe/repository/subscribe.repository';
import { ApiKeyService } from '../token/api-key.service';

@Injectable()
export class UserSubscribeService {
  constructor(
    private readonly userSubscribeRepository: UserSubscribeRepository,
    private readonly subscribeRepository: SubscribeRepository,
    private readonly apikeyService: ApiKeyService,
  ) {}

  async createSubscribe(userId: number, subscribeId: number) {
    const subscribe = await this.subscribeRepository.findOne({
      where: { id: subscribeId },
    });
    const createdAt = moment();
    const expiresAt = createdAt
      .add(subscribe.validityDuration, 'days')
      .endOf('day')
      .toDate();

    const apiKey = await this.apikeyService.createApikey({
      userId: userId,
    });

    const newSubscribe = this.userSubscribeRepository.create({
      userId: userId,
      subscriptionId: subscribeId,
      expiresAt,
    });

    return this.userSubscribeRepository.save(newSubscribe);
  }
}
