import {
  getDailyWeather,
  transformDailyWeatherData,
} from '@/entities/weather/api';
import type {
  DailyWeatherData,
  DistrictCoordinate,
} from '@/entities/weather/model';
import { useQuery } from '@tanstack/react-query';

export const useGetDailyWeather = ({ nx, ny }: DistrictCoordinate) => {
  return useQuery<DailyWeatherData>({
    queryKey: ['dailyWeather', nx, ny],
    queryFn: async () => {
      // 1. 현재 시간 기준 설정 (API 호출과 변환 기준점 통일)
      const now = new Date();
      // 2. API 호출 (과거/미래 데이터)
      const [pastItems, futureItems] = await getDailyWeather({ nx, ny, now });
      // 3. 데이터 병합 (과거 -> 미래 순서 중요! 중복 시 뒤에 오는 미래 데이터가 덮어씀)
      const allItems = [...pastItems, ...futureItems];
      // 4. 데이터 변환 및 필터링
      return transformDailyWeatherData(now, allItems);
    },
    // 5. 옵션 설정
    staleTime: 1000 * 60 * 30, // 30분간 캐시 유지
    gcTime: 1000 * 60 * 60, // 1시간 뒤 가비지 컬렉션 (v5부터 cacheTime -> gcTime)
    retry: 1,
  });
};
