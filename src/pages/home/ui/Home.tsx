import { useBookmarkStore } from '@/entities/bookmark';
import { useLocationStore } from '@/entities/location';
import { useGetDaliyWeatherList } from '@/features/weather/model';
import { Card, CardSkeleton } from '@/widgets/card';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

export const HomePage = () => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const {
    myLocation,
    isLoading: isLocLoading,
    // error, // 에러 발생했을 때 처리 및 UI 필요
  } = useLocationStore();

  const cityList = useMemo(() => {
    if (myLocation) return [myLocation, ...bookmarks];
    return bookmarks;
  }, [myLocation, bookmarks]);

  const result = useGetDaliyWeatherList(cityList);

  const hasWeatherError = result.some((query) => query.isError);

  useEffect(() => {
    if (hasWeatherError) {
      toast.error('일부 지역의 날씨 정보를 불러오지 못했습니다.', {
        id: 'weather-fetch-error',
        duration: 3000,
        icon: '☁️',
      });
    }
  }, [hasWeatherError]);

  return (
    <>
      {!myLocation && isLocLoading && <CardSkeleton />}

      {result.map(({ data, isLoading }, i) => {
        if (isLoading || !data) return <CardSkeleton key={`loading-${i}`} />;

        const displayData = { ...data, nickname: cityList[i].nickname };
        const isCurrentLocation = myLocation
          ? myLocation.address === data.address
          : false;
        return (
          <Card
            key={data.address}
            data={displayData}
            isCurrentLocation={isCurrentLocation}
          />
        );
      })}
    </>
  );
};
