import type { CityRdo } from '@/entities/search/rdo';

export type RawCityData = Record<string, CityRdo[]>;
export type RawCityDataById = Map<number, CityRdo>;
