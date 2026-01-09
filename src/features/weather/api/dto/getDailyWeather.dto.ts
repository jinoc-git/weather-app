import type { DistrictCoordinate } from '@/features/weather/model';

export type GetDailyWeatherDto = {
  now: Date;
} & DistrictCoordinate;
