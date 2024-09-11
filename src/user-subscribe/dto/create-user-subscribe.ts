import { PickType } from '@nestjs/swagger';
import { SubscribeUserEntity } from '../entity/subscribe-user.entity';

export class CreateUserSubscribeDto extends PickType(SubscribeUserEntity, [
  'subscriptionId',
  'userId',
]) {}
