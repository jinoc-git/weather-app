import type { RawCityData } from '@/entities/search/model/types';
import type { CityRdo } from '@/entities/search/rdo';

export const getGridCityMap = async (): Promise<Record<string, CityRdo>> => {
  const module = await import('./grid_city_map.json');
  return module.default as Record<string, CityRdo>;
};

export const getCityIdMap = async (): Promise<Record<string, CityRdo[]>> => {
  const module = await import('./city_id_map.json');
  return module.default as Record<string, CityRdo[]>;
};

export const getNormalizedGroupKeys = async () => {
  const groupKeyModule = await import('./normalized_group_keys.json');
  const rawDataModule = await import('./korea_district_search_optimized.json');

  return {
    normalizedData: groupKeyModule.default as {
      originalKey: string;
      normalizedKey: string;
    }[],
    rawData: rawDataModule.default as RawCityData,
  };
};
