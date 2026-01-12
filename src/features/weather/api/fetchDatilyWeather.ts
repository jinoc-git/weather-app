import type { CityDto } from '@/entities/search';
import { getDailyWeather, transformDailyWeatherData } from '@/entities/weather';

export const fetchDatilyWeather = async (now: Date, params: CityDto) => {
  const { nx, ny } = params;

  const [pastItems, futureItems] = await getDailyWeather({ nx, ny, now });
  const allItems = [...pastItems, ...futureItems];
  return transformDailyWeatherData(now, allItems, params);
};
