import { PartialType } from '@nestjs/swagger';

import { getAllQuery } from '../../shared/dto/query.dto';

export class getAllSubscribeDto extends PartialType(getAllQuery) {}
