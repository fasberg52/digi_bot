import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DigikalaOtp {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  otp: number;
}
