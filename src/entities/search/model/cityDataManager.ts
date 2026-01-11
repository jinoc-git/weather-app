import { mapCityRdoToDto } from '@/entities/search/lib';
import { normalizeString } from '@/shared';
import type { CityDto } from '@/entities/search';
import type { CityRdo } from '@/entities/search/rdo';
import { RAW_CITY_DATA } from '@/entities/search/model';

const initializeCityData = () => {
  // 위치 조회용 Map (Key: "nx:ny", Value: CityDto)
  const gridCityMap = new Map<string, CityDto>();
  // 행정구역 코드 조회용 Map (Key: cityId, Value: CityRdo[])
  const cityIdMap = new Map<number, CityRdo[]>();
  // 검색 UI용 정규화된 키 리스트
  const normalizedGroupKeys: { originalKey: string; normalizedKey: string }[] =
    [];

  for (const [groupKey, cities] of Object.entries(RAW_CITY_DATA)) {
    normalizedGroupKeys.push({
      originalKey: groupKey,
      normalizedKey: normalizeString(groupKey),
    });

    for (const city of cities) {
      const gridKey = `${city.nx}:${city.ny}`;
      if (!gridCityMap.has(gridKey)) {
        gridCityMap.set(gridKey, mapCityRdoToDto(city));
      }

      const existingList = cityIdMap.get(city.id);
      if (existingList) existingList.push(city);
      else cityIdMap.set(city.id, [city]);
    }
  }

  return { gridCityMap, cityIdMap, normalizedGroupKeys };
};

const { gridCityMap, cityIdMap, normalizedGroupKeys } = initializeCityData();

export { gridCityMap, cityIdMap, normalizedGroupKeys };
