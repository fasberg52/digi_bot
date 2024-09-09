import { PartialType } from '@nestjs/swagger';
import { CreateSubscribeDto } from './create-subscribe.dto';

export class UpdateSubscribeDto extends PartialType(CreateSubscribeDto) {}
