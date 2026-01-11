import type { CityDto } from '../dto';
import { cityIdMap } from '@/entities/search/model';
import { mapCityRdoToDto } from '@/entities/search/lib';

export const getCityDataById = (
  cityId: string | undefined,
  addr: string | null
): CityDto | null => {
  if (!cityId || !addr) return null;

  const data = cityIdMap.get(Number(cityId));
  if (!data) return null;

  const targetCity = data.find((city) => {
    const dtoCity = mapCityRdoToDto(city);
    return dtoCity.address === addr;
  });
  if (!targetCity) return null;

  return mapCityRdoToDto(targetCity);
};
