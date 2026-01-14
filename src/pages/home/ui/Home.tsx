import { useBookmarkStore } from '@/entities/bookmark';
import { useLocationStore } from '@/entities/location';
import { useGetDaliyWeatherList } from '@/features/weather/model';
import { CardSkeleton, RenderCardFromHome } from '@/widgets/card';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

export const HomePage = () => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const {
    myLocation,
    // isLoading: isLocLoading,
    error,
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

  const showLocationSkeleton = !myLocation && !error;
  const showLocationCard = !!myLocation;

  return (
    <>
      {showLocationSkeleton && <CardSkeleton key="current-location-skeleton" />}
      {showLocationCard && (
        <RenderCardFromHome
          queryResult={result[0]}
          city={myLocation}
          isCurrentLocation={true}
        />
      )}

      {bookmarks.map((city, i) => {
        const dataIndex = myLocation ? i + 1 : i;
        return (
          <RenderCardFromHome
            key={city.address}
            queryResult={result[dataIndex]}
            city={city}
            isCurrentLocation={false}
          />
        );
      })}
    </>
  );
};
