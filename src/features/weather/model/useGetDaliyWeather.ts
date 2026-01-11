import { fetchDatilyWeather } from '@/features/weather/api';
import type { UseGetDailyWeatherParams } from '@/features/weather/model/type';
import { useQuery } from '@tanstack/react-query';

export const useGetDailyWeather = (params: UseGetDailyWeatherParams | null) => {
  const now = new Date();

  return useQuery({
    queryKey: ['dailyWeather', params?.id, params?.placeName],
    queryFn: () => {
      if (!params) throw new Error('지역 정보가 없습니다');
      return fetchDatilyWeather(now, params);
    },
    enabled: !!params,
  });
};
