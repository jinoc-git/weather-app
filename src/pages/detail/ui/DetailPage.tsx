import { useCityData } from '@/features/search';
import { useGetDailyWeather } from '@/features/weather/model/useGetDaliyWeather';
import { DetailPageError } from '@/pages/detail/ui/DetailPageError';
import { Card, CardSkeleton } from '@/widgets/card';
import { useParams, useSearchParams } from 'react-router-dom';

export const DetailPage = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [searchParams] = useSearchParams();
  const addrParam = searchParams.get('addr');

  const { data: cityData } = useCityData(cityId, addrParam);
  const { data, isPending } = useGetDailyWeather(cityData);

  if (!cityId || !addrParam) return <DetailPageError type="잘못된 접근" />;

  if (isPending) return <CardSkeleton />;
  if (!data) return <DetailPageError type="데이터 없음" />;

  return <Card data={data} preventNavigation />;
};
