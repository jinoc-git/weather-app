import type { DistrictCoordinate } from '@/shared';

export type CityRdo = {
  id: number; // 행정구역 코드
  addr: string; // "서울특별시 종로구 청운효자동"
} & DistrictCoordinate;
