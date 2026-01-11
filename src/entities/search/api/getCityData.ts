import type { CityDto } from '../dto';
import type { RawCityDataById } from '@/entities/search/model';
import type { CityRdo } from '@/entities/search/rdo';
import { RAW_CITY_DATA } from '@/entities/search/model';
import { mapCityRdoToDto } from '@/entities/search/lib';

const createCityIdMap = (): RawCityDataById => {
  const map = new Map<number, CityRdo[]>();
  const allGroups = Object.values(RAW_CITY_DATA);
  for (const group of allGroups) {
    for (const city of group) {
      const existingList = map.get(city.id);
      if (existingList) {
        existingList.push(city);
      } else {
        map.set(city.id, [city]);
      }
    }
  }

  return map;
};

const rawCityDataById = createCityIdMap();

export const getCityData = (cityId: number, addr: string): CityDto | null => {
  const data = rawCityDataById.get(cityId);
  if (!data) return null;

  const targetCity = data.find((city) => {
    const dtoCity = mapCityRdoToDto(city);
    return dtoCity.address === addr;
  });
  if (!targetCity) return null;

  return mapCityRdoToDto(targetCity);
};
