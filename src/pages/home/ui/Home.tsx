import { Card } from '@/widgets/card';
import { useGetDailyWeather } from '@/features/weather/api';

export const HomePage = () => {
  const eg = [
    {
      nx: 55,
      ny: 127,
      placeName: '1',
      nickname: '1',
    },
    {
      nx: 60,
      ny: 127,
      placeName: '2',
      nickname: '2',
    },
    {
      nx: 61,
      ny: 127,
      placeName: '3',
      nickname: '3',
    },
    {
      nx: 60,
      ny: 126,
      placeName: '4',
      nickname: '4',
    },
    {
      nx: 59,
      ny: 126,
      placeName: '5',
      nickname: '5',
    },
    {
      nx: 62,
      ny: 127,
      placeName: '6',
      nickname: '6',
    },
  ];

  const result = useGetDailyWeather(eg);

  return (
    <>
      {result.map(({ data, isLoading }) => {
        if (isLoading || !data) {
          return <div>로딩중...</div>; // 스켈레톤 추가 예정
        }

        return <Card key={data.nickname} data={data} />;
      })}
    </>
  );
};
