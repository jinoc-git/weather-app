import type { CityDto } from '@/entities/search';
import { fetchDatilyWeather } from '@/features/weather/api';
import { useQueries } from '@tanstack/react-query';

export const useGetDaliyWeatherList = (params: CityDto[]) => {
  const now = new Date();
  return useQueries({
    queries: params.map((param) => ({
      queryKey: ['dailyWeather', param.id, param.address],
      queryFn: () => fetchDatilyWeather(now, param),
    })),
  });
};
