import { PartialType } from '@nestjs/mapped-types';
import { CreateApiKeyDto } from './create-api.dto';

export class UpdateApiKeyDto extends PartialType(CreateApiKeyDto) {}
