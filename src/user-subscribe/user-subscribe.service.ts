import { Injectable } from '@nestjs/common';
import { CreateUserSubscribeDto } from './dto/create-user-subscribe';
import { UserSubscribeRepository } from './repository/subscribe-user.repository';
import * as moment from 'moment-jalaali';
import { SubscribeRepository } from 'src/subscribe/repository/subscribe.repository';

@Injectable()
export class UserSubscribeService {
  constructor(
    private readonly userSubscribeRepository: UserSubscribeRepository,
    private readonly subscribeRepository: SubscribeRepository,
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

    const newSubscribe = this.userSubscribeRepository.create({
      userId: userId,
      subscriptionId: subscribeId,
      expiresAt,
    });

    return this.userSubscribeRepository.save(newSubscribe);
  }
}
