import type { CityDto } from '../dto';
import { getCityIdMap } from '@/entities/search/model';
import { mapCityRdoToDto } from '@/entities/search/lib';

export const getCityDataById = async (
  cityId: string | undefined,
  addr: string | null,
): Promise<CityDto | null> => {
  if (!cityId || !addr) return null;

  const cityIdMap = await getCityIdMap();

  const data = cityIdMap[cityId];
  if (!data) return null;

  const targetCity = data.find((city) => {
    const dtoCity = mapCityRdoToDto(city);
    return dtoCity.address === addr;
  });
  if (!targetCity) return null;

  return mapCityRdoToDto(targetCity);
};
