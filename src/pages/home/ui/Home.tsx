import { useBookmarkStore } from '@/entities/bookmark';
import { useLocationStore } from '@/entities/location';
import { useGetDaliyWeatherList } from '@/features/weather/model';
import { Card, CardSkeleton } from '@/widgets/card';
import { useMemo } from 'react';

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

  return (
    <>
      {/* {isLocLoading && <CardSkeleton />} */}

      {result.map(({ data, isLoading }, i) => {
        if (isLoading || !data) return <CardSkeleton key={`loading-${i}`} />;

        const displayData = { ...data, nickname: cityList[i].nickname };
        const isCurrentLocation = myLocation ? i === 0 : false;
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
