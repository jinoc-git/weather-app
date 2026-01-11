import type { CityDto } from '@/entities/search/dto';
import type { CityRdo } from '@/entities/search/rdo';

export const mapCityRdoToDto = (rdo: CityRdo): CityDto => {
  // 공백 기준으로 잘라서 가장 마지막 단어를 placeName으로 사용합니다.
  // 예: "서울특별시 종로구" -> ["서울특별시", "종로구"] -> "종로구"
  // 예: "서울특별시 종로구 효자동" -> [..., "효자동"] -> "효자동"
  const address = rdo.addr.replace(/-/g, ' ');
  const addressParts = address.split(' ');
  const placeName = addressParts[addressParts.length - 1];

  return {
    id: rdo.id,
    placeName,
    address,
    nx: rdo.nx,
    ny: rdo.ny,
  };
};
