import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckApiKeyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  apiKey: string;
}
