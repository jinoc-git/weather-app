import { getDailyWeather, transformDailyWeatherData } from '@/entities/weather';
import type { UseGetDailyWeatherParams } from '@/features/weather/model';
import { useQueries } from '@tanstack/react-query';

export const useGetDailyWeather = (coords: UseGetDailyWeatherParams[]) => {
  const now = new Date();
  return useQueries({
    queries: coords.map(({ nx, ny, placeName, nickname }) => ({
      queryKey: ['dailyWeather', nx, ny],
      queryFn: async () => {
        // 1. 현재 시간 기준 설정 (API 호출과 변환 기준점 통일)
        // 2. API 호출 (과거/미래 데이터)
        const [pastItems, futureItems] = await getDailyWeather({ nx, ny, now });
        // 3. 데이터 병합 (과거 -> 미래 순서 중요! 중복 시 뒤에 오는 미래 데이터가 덮어씀)
        const allItems = [...pastItems, ...futureItems];
        // 4. 데이터 변환 및 필터링
        return transformDailyWeatherData(now, allItems, {
          placeName,
          nickname,
        });
      },
      // 5. 옵션 설정
      staleTime: 1000 * 60 * 30, // 30분간 캐시 유지
      gcTime: 1000 * 60 * 60, // 1시간 뒤 가비지 컬렉션 (v5부터 cacheTime -> gcTime)
      retry: 1,
    })),
  });
};
