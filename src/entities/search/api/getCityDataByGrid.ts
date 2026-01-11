import type { CityDto } from '@/entities/search/dto';
import { gridCityMap } from '@/entities/search/model';

export const getCityDataByGrid = (
  nx: number,
  ny: number
): CityDto | undefined => {
  return gridCityMap.get(`${nx}:${ny}`);
};
