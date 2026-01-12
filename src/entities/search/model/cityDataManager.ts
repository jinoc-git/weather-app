import gridCityMapOrigin from './grid_city_map.json';
import cityIdMapOrigin from './city_id_map.json';
import normalizedGroupKeysOrigin from './normalized_group_keys.json';
import type { CityRdo } from '@/entities/search/rdo';

const gridCityMap = gridCityMapOrigin as Record<string, CityRdo>;
const cityIdMap = cityIdMapOrigin as Record<string, CityRdo[]>;
const normalizedGroupKeys = normalizedGroupKeysOrigin as {
  originalKey: string;
  normalizedKey: string;
}[];

export { gridCityMap, cityIdMap, normalizedGroupKeys };
