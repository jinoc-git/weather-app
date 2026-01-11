import type { DistrictCoordinate } from '@/shared';

export type CityDto = {
  id: number; // 고유 ID 행정구역 코드
  placeName: string; // 화면에 크게 보여줄 이름 (예: "종로구", "효자동")
  address: string; // 전체 주소 (예: "서울특별시 종로구")
} & DistrictCoordinate;
