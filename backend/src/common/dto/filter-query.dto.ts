import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

import { personFilterableFields, vehicleFilterableFields, starshipFilterableFields, planetFilterableFields } from '../utils/filterable-fields';

const ALL_FILTERABLE_FIELDS = [
  ...personFilterableFields,
  ...vehicleFilterableFields,
  ...starshipFilterableFields,
  ...planetFilterableFields,
].map(String);

type SortOrder = 'asc' | 'desc';

export class ResourceQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be at least 1' })
  page?: number;

  @IsOptional()
  @IsString({ message: 'sort must be a string' })
  @IsIn(ALL_FILTERABLE_FIELDS, { message: `sort must be one of: ${ALL_FILTERABLE_FIELDS.join(', ')}` })
  sort?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be at least 1' })
  @Max(100, { message: 'limit must be at most 100' })
  limit?: number;

  @IsOptional()
  @IsString({ message: 'order must be a string' })
  @IsIn(['asc', 'desc'], { message: 'order must be "asc" or "desc"' })
  order?: SortOrder;
}