import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  page: number = 0;

  @ApiProperty({ example: 20 })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  limit: number = 0;
}
