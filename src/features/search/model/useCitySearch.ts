import { getCityListRaw } from '@/entities/search/api/getCityList';
import type { CityDto } from '@/entities/search/dto';
import { mapCityRdoToDto } from '@/entities/search/lib';
import { normalizeString } from '@/features/search/lib';
import { useState, useMemo } from 'react';

export const useCitySearch = () => {
  const [query, setQuery] = useState('');

  const { normalizedData: allKeys, rawData } = getCityListRaw();

  const results = useMemo(() => {
    if (!query || query.trim().length === 0) return [];

    const normalizedQuery = normalizeString(query);
    const MAX_RESULTS = 50;

    const matchedKeys = [];
    for (const key of allKeys) {
      if (key.normalizedKey.includes(normalizedQuery)) {
        matchedKeys.push(key.originalKey);
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
  }, [query, allKeys, rawData]);

  return { query, setQuery, results };
};
