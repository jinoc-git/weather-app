import { Card } from '@/widgets/card';
import { useGetDailyWeather } from '@/features/weather/api';

export const HomePage = () => {
  const eg = [
    {
      nx: 55,
      ny: 127,
    },
    {
      nx: 60,
      ny: 127,
    },
    {
      nx: 61,
      ny: 127,
    },
    {
      nx: 60,
      ny: 126,
    },
    {
      nx: 59,
      ny: 126,
    },
    {
      nx: 62,
      ny: 127,
    },
  ];

  const result = useGetDailyWeather(eg);
  console.log(result);
  return (
    <>
      {result.map(({ data, isLoading }) => {
        if (isLoading || !data) {
          return <div>로딩중...</div>;
        }

        return <Card data={data} />;
      })}
    </>
  );
};
