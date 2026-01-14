import type { CityDto } from '@/entities/search';
import type { DailyWeatherData } from '@/entities/weather';
import { Card } from '@/widgets/card/ui/Card';
import { CardSkeleton } from '@/widgets/card/ui/Card.skeleton';
import type { UseQueryResult } from '@tanstack/react-query';

type Props = {
  queryResult: UseQueryResult<DailyWeatherData>;
  city: CityDto;
  isCurrentLocation?: boolean;
  preventNavigation?: boolean;
};

export const RenderCardFromHome = ({
  queryResult,
  city,
  isCurrentLocation,
}: Props) => {
  if (!queryResult || queryResult.isLoading || !queryResult.data) {
    return <CardSkeleton key={`skeleton-${city.address}`} />;
  }

  const { data } = queryResult;
  const displayData = { ...data, nickname: city.nickname };

  return (
    <Card
      key={data.address}
      data={displayData}
      isCurrentLocation={isCurrentLocation}
    />
  );
};
