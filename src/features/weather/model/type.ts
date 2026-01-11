import type { CityIdenty } from '@/entities/search';
import type { DistrictCoordinate } from '@/shared';

export type UseGetDailyWeatherParams = CityIdenty & DistrictCoordinate;
