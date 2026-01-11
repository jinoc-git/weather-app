import { useBookmarkStore } from '@/entities/bookmark';
import { useGetDaliyWeatherList } from '@/features/weather/model';
import { Card, CardSkeleton } from '@/widgets/card';
import { useMemo } from 'react';

export const HomePage = () => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  // 추후 현재 위치로 변경 예정
  const currentLocation = useMemo(
    () => ({
      id: 1111053000,
      nx: 60,
      ny: 127,
      address: '서울특별시 종로구 사직동',
      placeName: '사직동',
      nickname: '나의 위치',
    }),
    []
  );

  const cityList = useMemo(() => {
    return [currentLocation, ...bookmarks];
  }, [currentLocation, bookmarks]);

  const result = useGetDaliyWeatherList(cityList);

  return (
    <>
      {result.map(({ data, isLoading }, i) => {
        if (isLoading || !data) return <CardSkeleton key={`${i}-loading`} />;

        const displayData = { ...data, nickname: cityList[i].nickname };
        const isCurrentLocation = i === 0;
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
