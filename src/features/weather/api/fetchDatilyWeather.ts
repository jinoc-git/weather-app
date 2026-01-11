import type { CityDto } from '@/entities/search';
import { getDailyWeather, transformDailyWeatherData } from '@/entities/weather';

export const fetchDatilyWeather = async (now: Date, params: CityDto) => {
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
