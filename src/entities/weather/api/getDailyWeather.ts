import type { GetDailyWeatherDto } from '@/entities/weather/api/dto';
import {
  calculateFutureQueryParams,
  calculatePastQueryParams,
} from '@/entities/weather/api/lib';
import type { WeatherApiRto } from '@/entities/weather/api/rdo';
import type { WeatherInfo } from '@/entities/weather/model/types';
import { getWeatherApi } from '@/shared';

// 1. 과거 날씨 데이터 조회 (오늘 05시 ~ 현재 직전)
export const fetchPastDayWeather = async ({
  nx,
  ny,
  now,
}: GetDailyWeatherDto) => {
  const { base_date, base_time, numOfRows } = calculatePastQueryParams(now);

  if (numOfRows <= 0) return [];

  const response = await getWeatherApi<WeatherApiRto<WeatherInfo>>(
    '/getVilageFcst',
    {
      params: {
        numOfRows,
        base_date,
        base_time,
        nx,
        ny,
      },
    }
  );

  return response?.items?.item || [];
};

// 2. 미래(남은) 날씨 데이터 조회 (현재 ~ 내일 05시)
export const fetchFutureDayWeather = async ({
  nx,
  ny,
  now,
}: GetDailyWeatherDto) => {
  const { base_date, base_time, numOfRows } = calculateFutureQueryParams(now);

  const response = await getWeatherApi<WeatherApiRto<WeatherInfo>>(
    '/getVilageFcst',
    {
      params: {
        numOfRows,
        base_date,
        base_time,
        nx,
        ny,
      },
    }
  );

  return response?.items?.item || [];
};

export const getDailyWeather = async ({ nx, ny, now }: GetDailyWeatherDto) => {
  const data = await Promise.all([
    fetchPastDayWeather({ nx, ny, now }),
    fetchFutureDayWeather({ nx, ny, now }),
  ]);

  return data;
};
