import { PartialType } from '@nestjs/swagger';

import { getAllQuery } from 'src/shared/dto/query.dto';

export class getAllSubscribeDto extends PartialType(getAllQuery) {}
