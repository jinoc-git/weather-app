import type {
  DistrictCoordinate,
  WeatherDataIdenty,
} from '@/entities/weather/model';

export type UseGetDailyWeatherParams = WeatherDataIdenty & DistrictCoordinate;
