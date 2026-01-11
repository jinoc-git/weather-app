import { getCityData } from '@/entities/search';
import { useGetDailyWeather } from '@/features/weather/model/useGetDaliyWeather';
import { Card, CardSkeleton } from '@/widgets/card';
import { useParams, useSearchParams } from 'react-router-dom';

export const DetailPage = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [searchParams] = useSearchParams();
  const addrParam = searchParams.get('addr');

  const cityData = getCityData(cityId, addrParam);
  const { data, isPending } = useGetDailyWeather(cityData);

  if (!cityId || !addrParam) return <div>도시 정보가 없습니다</div>;

  if (isPending) return <CardSkeleton />;
  if (!data) return <div>도시 정보가 없습니다</div>;

  return <Card data={data} />;
};
