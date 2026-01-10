import type { WeatherDataIdenty } from '@/entities/weather';
import type { DistrictCoordinate } from '@/shared';

export type UseGetDailyWeatherParams = WeatherDataIdenty & DistrictCoordinate;
