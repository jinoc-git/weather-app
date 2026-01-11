import {
  normalizedGroupKeys,
  RAW_CITY_DATA,
  type RawCityData,
} from '@/entities/search/model';

export const getNomalizedCityList = (): {
  normalizedData: typeof normalizedGroupKeys;
  rawData: RawCityData;
} => {
  return { normalizedData: normalizedGroupKeys, rawData: RAW_CITY_DATA };
};
