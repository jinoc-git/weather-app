import {
  getNomalizedCityList,
  mapCityRdoToDto,
  type CityDto,
} from '@/entities/search';
import { normalizeString } from '@/shared';
import { useMemo } from 'react';

export const useCitySearch = (keyword: string) => {
  const { normalizedData: allKeys, rawData } = useMemo(() => {
    return getNomalizedCityList();
  }, []);

  const results = useMemo(() => {
    if (!keyword || keyword.trim().length === 0) return [];

    const normalizedQuery = normalizeString(keyword);
    const MAX_RESULTS = 50;

    const matchedKeys = [];
    for (const item of allKeys) {
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
  }, [keyword, allKeys, rawData]);

  return { results };
};
