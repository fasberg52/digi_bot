import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ example: 0 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  page: number = 0;

  @ApiProperty({ example: 20 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  limit: number = 0;
}
