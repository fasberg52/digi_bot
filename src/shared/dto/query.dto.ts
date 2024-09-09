import { ApiProperty, ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

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
  sortOrder: string = 'DESC';
}
