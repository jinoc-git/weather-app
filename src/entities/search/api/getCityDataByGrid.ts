import type { CityDto } from '@/entities/search/dto';
import { mapCityRdoToDto } from '@/entities/search/lib';
import { gridCityMap } from '@/entities/search/model';

export const getCityDataByGrid = (
  nx: number,
  ny: number
): CityDto | undefined => {
  const city = gridCityMap[`${nx}:${ny}`];
  if (!city) return undefined;
  return mapCityRdoToDto(city);
};
