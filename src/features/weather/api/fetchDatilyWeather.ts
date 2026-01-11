import { getDailyWeather, transformDailyWeatherData } from '@/entities/weather';
import type { UseGetDailyWeatherParams } from '@/features/weather/model';

export const fetchDatilyWeather = async (
  now: Date,
  params: UseGetDailyWeatherParams
) => {
  const { id, nx, ny, address, placeName, nickname } = params;

  const [pastItems, futureItems] = await getDailyWeather({ nx, ny, now });
  const allItems = [...pastItems, ...futureItems];
  return transformDailyWeatherData(now, allItems, {
    address,
    id,
    placeName,
    nickname,
  });
};
