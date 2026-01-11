import { RAW_CITY_DATA, type RawCityData } from '@/entities/search/model';
import { normalizeString } from '@/shared';

const normalizedData = Object.keys(RAW_CITY_DATA).map((key) => ({
  originalKey: key,
  normalizedKey: normalizeString(key),
}));

export const getCityListRaw = (): {
  normalizedData: typeof normalizedData;
  rawData: RawCityData;
} => {
  return { normalizedData, rawData: RAW_CITY_DATA };
};
