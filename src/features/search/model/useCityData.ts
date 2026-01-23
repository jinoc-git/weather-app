import { getCityDataById } from '@/entities/search';
import { useQuery } from '@tanstack/react-query';

export const useCityData = (
  cityId: string | undefined,
  addr: string | null,
) => {
  return useQuery({
    queryKey: ['cityData', cityId, addr],
    queryFn: () => getCityDataById(cityId, addr),
    enabled: !!cityId && !!addr,
    staleTime: Infinity,
  });
};
