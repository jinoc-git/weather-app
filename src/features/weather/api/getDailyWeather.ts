import type { GetDailyWeatherDto } from '@/features/weather/api/dto';
import {
  calculateFutureQueryParams,
  calculatePastQueryParams,
} from '@/features/weather/api/lib';
import type { WeatherApiRto } from '@/features/weather/api/rdo';
import type { WeatherInfo } from '@/features/weather/model/types';
import { weatherApi } from '@/shared/api';

// 1. 과거 날씨 데이터 조회 (오늘 05시 ~ 현재 직전)
export const fetchPastDayWeather = async ({
  nx,
  ny,
  now,
}: GetDailyWeatherDto) => {
  const { base_date, base_time, numOfRows } = calculatePastQueryParams(now);

  if (numOfRows <= 0) return []; // 조회할 데이터가 없음

  const response = await weatherApi.get<WeatherApiRto<WeatherInfo>>(
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

  return response.data?.response?.body?.items?.item || [];
};

// 2. 미래(남은) 날씨 데이터 조회 (현재 ~ 내일 05시)
export const fetchFutureDayWeather = async ({
  nx,
  ny,
  now,
}: GetDailyWeatherDto) => {
  const { base_date, base_time, numOfRows } = calculateFutureQueryParams(now);

  const response = await weatherApi.get<WeatherApiRto<WeatherInfo>>(
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

  return response.data?.response?.body?.items?.item || [];
};

export const getDailyWeather = async ({ nx, ny, now }: GetDailyWeatherDto) => {
  const [pastData, futureData] = await Promise.all([
    fetchPastDayWeather({ nx, ny, now }),
    fetchFutureDayWeather({ nx, ny, now }),
  ]);

  const data = pastData.concat(futureData);

  console.log(data);
  return data;
};
