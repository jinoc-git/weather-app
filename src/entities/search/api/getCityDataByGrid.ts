import type { CityDto } from '@/entities/search/dto';
import { mapCityRdoToDto } from '@/entities/search/lib';
import { getGridCityMap } from '@/entities/search/model';
import type { CityRdo } from '@/entities/search/rdo';

let cachedGridCityMap: Record<string, CityRdo> | null = null;

export const getCityDataByGrid = async (
  nx: number,
  ny: number,
): Promise<CityDto | undefined> => {
  if (!cachedGridCityMap) {
    cachedGridCityMap = await getGridCityMap();
  }

  const city = cachedGridCityMap[`${nx}:${ny}`];
  if (!city) return undefined;
  return mapCityRdoToDto(city);
};
