import type { DistrictCoordinate } from '@/entities/weather/model';

export type GetDailyWeatherDto = {
  now: Date;
} & DistrictCoordinate;
