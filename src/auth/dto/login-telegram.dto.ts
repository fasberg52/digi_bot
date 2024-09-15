import { PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../../users/entity/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsPhoneNumber, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class loginTelegramDto extends PickType(UserEntity, [
  'telegramId',
  'userName',
] as const) {}

export class TelegramProfileDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone_number?: string;
}
