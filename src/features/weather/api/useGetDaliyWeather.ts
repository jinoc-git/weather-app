import { getDailyWeather, transformDailyWeatherData } from '@/entities/weather';
import type { UseGetDailyWeatherParams } from '@/features/weather/model';
import { useQueries } from '@tanstack/react-query';

export const useGetDailyWeather = (coords: UseGetDailyWeatherParams[]) => {
  const now = new Date();
  return useQueries({
    queries: coords.map(({ id, nx, ny, placeName, nickname }) => ({
      queryKey: ['dailyWeather', id],
      queryFn: async () => {
        const [pastItems, futureItems] = await getDailyWeather({ nx, ny, now });
        const allItems = [...pastItems, ...futureItems];
        return transformDailyWeatherData(now, allItems, {
          id,
          placeName,
          nickname,
        });
      },
      staleTime: 1000 * 60 * 30, // 30분간 캐시 유지
      gcTime: 1000 * 60 * 60, // 1시간 뒤 가비지 컬렉션
      retry: 1,
    })),
  });
};
