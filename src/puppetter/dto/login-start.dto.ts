import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DigikalaPhone {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
}
