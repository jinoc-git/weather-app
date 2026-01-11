import type { CityDto } from '../dto';
import type { RawCityDataById } from '@/entities/search/model';
import type { CityRdo } from '@/entities/search/rdo';
import { RAW_CITY_DATA } from '@/entities/search/model';
import { mapCityRdoToDto } from '@/entities/search/lib';

const createCityIdMap = (): RawCityDataById => {
  const map = new Map<number, CityRdo>();
  const allGroups = Object.values(RAW_CITY_DATA);

  for (const group of allGroups) {
    for (const city of group) {
      map.set(city.id, city);
    }
  }

  return map;
};

const rawCityDataById = createCityIdMap();

export const getCityById = (cityId: number): CityDto | null => {
  const data = rawCityDataById.get(cityId);
  if (!data) return null;

  return mapCityRdoToDto(data);
};
