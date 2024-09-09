import { PickType } from '@nestjs/swagger';
import { SubscribeEntity } from '../entity/subscribe.entity';

export class CreateSubscribeDto extends PickType(SubscribeEntity, [
  'title',
  'description',
  'price',
  'discount',
  'start',
  'end',
  'validityDuration',
  'status',
] as const) {}
