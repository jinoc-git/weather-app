import { create } from 'zustand';
import { dfs_xy_conv } from '@/shared/lib/location';
import { getCityDataByGrid, type CityDto } from '@/entities/search';

type LocationState = {
  myLocation: CityDto | null; // 조회된 현재 위치 정보
  isLoading: boolean; // GPS 수신 및 조회 중 여부
  error: string | null; // 에러 메시지
  fetchMyLocation: () => void; // 위치 찾기 실행 함수
};

export const useLocationStore = create<LocationState>((set) => ({
  myLocation: null,
  isLoading: false,
  error: null,

  fetchMyLocation: () => {
    if (!navigator.geolocation) {
      set({ error: 'GPS를 지원하지 않습니다' });
      return;
    }

    set({ isLoading: true, error: null });

    // 현재 위치 요청
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // 위경도 -> 기상청 격자 변환
        const { x, y } = dfs_xy_conv(latitude, longitude);
        const matchedCity = getCityDataByGrid(x, y);

        if (matchedCity) {
          set({
            myLocation: {
              ...matchedCity,
              nickname: '나의 위치',
            },
            isLoading: false,
          });
        } else {
          // 조회할 수 없는 지역일 때 (예: 바다, 해외 등)
          set({
            isLoading: false,
            error: '현재 위치의 날씨 데이터를 찾을 수 없습니다.',
            myLocation: null,
          });
        }
      },
      (err) => {
        // GPS 에러 처리
        console.error('Geolocation Error:', err);
        let errorMessage = '위치 정보를 가져올 수 없습니다.';

        if (err.code === err.PERMISSION_DENIED) {
          errorMessage = '위치 정보 권한을 허용해주세요.';
        }

        set({
          isLoading: false,
          error: errorMessage,
        });
      },
      // 정확도 높임, 타임아웃 5초
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  },
}));
