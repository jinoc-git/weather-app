import type { DistrictCoordinate } from '@/shared';

export type GetDailyWeatherDto = {
  now: Date;
} & DistrictCoordinate;
