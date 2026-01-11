import { fetchDatilyWeather } from '@/features/weather/api';
import type { UseGetDailyWeatherParams } from '@/features/weather/model';
import { useQueries } from '@tanstack/react-query';

export const useGetDaliyWeatherList = (params: UseGetDailyWeatherParams[]) => {
  const now = new Date();
  return useQueries({
    queries: params.map((param) => ({
      queryKey: ['dailyWeather', param.id, param.placeName],
      queryFn: () => fetchDatilyWeather(now, param),
    })),
  });
};
