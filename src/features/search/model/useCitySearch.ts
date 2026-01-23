import { mapCityRdoToDto, type CityDto } from '@/entities/search';
import { normalizeString } from '@/shared';
import { useSearchBaseData } from './useSearchBaseData';
import { useMemo } from 'react';

export const useCitySearch = (keyword: string) => {
  const { data: searchBaseData, isLoading } = useSearchBaseData();

  const results = useMemo(() => {
    if (!searchBaseData || !keyword || keyword.trim().length === 0) return [];

    const { normalizedData, rawData } = searchBaseData;

    const normalizedQuery = normalizeString(keyword);
    const MAX_RESULTS = 50;
    const matchedKeys = [];

    for (const item of normalizedData) {
      if (item.normalizedKey.includes(normalizedQuery)) {
        matchedKeys.push(item.originalKey);
      }
      if (matchedKeys.length >= MAX_RESULTS) break;
    }

    const flattenedResults: CityDto[] = [];
    for (const key of matchedKeys) {
      const cityList = rawData[key];
      for (const cityRdo of cityList) {
        flattenedResults.push(mapCityRdoToDto(cityRdo));
        if (flattenedResults.length >= MAX_RESULTS) return flattenedResults;
      }
    }

    return flattenedResults;
  }, [searchBaseData, keyword]);

  return { results, isLoading };
};
