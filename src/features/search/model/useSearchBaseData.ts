import { getNormalizedGroupKeys } from '@/entities/search/model';
import { useQuery } from '@tanstack/react-query';

export const useSearchBaseData = () => {
  return useQuery({
    queryKey: ['citySearchBaseData'],
    queryFn: getNormalizedGroupKeys,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
