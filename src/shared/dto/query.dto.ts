import { ApiProperty, ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '../../shared/dto/pagination.dto';

export class getAllQuery extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  @IsString()
  search: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortBy: string = 'id';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sortOrder: string = 'DESC';
}
