import { IsBooleanString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { MissingStatus } from '../../shared/entities/missing.entity';

export class QueryMissingDto {
  @IsOptional()
  @Type(() => Number)
  constructionId?: number;

  @IsOptional()
  @Type(() => Number)
  architectId?: number;

  @IsOptional()
  @IsEnum(MissingStatus)
  status?: MissingStatus;

  @IsOptional()
  @IsBooleanString()
  urgent?: string; // 'true' | 'false'

  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  pageSize?: number = 20;
}
