import { Card } from '@/widgets/card';
import { useGetDailyWeather } from '@/features/weather/api';

export const HomePage = () => {
  const eg = [
    {
      id: 1138063200,
      nx: 59,
      ny: 127,
      address: '신사제2동',
      placeName: '서울특별시 은평구 신사제2동',
      nickname: '서울특별시 은평구 신사제2동',
    },
    {
      id: 5213071000,
      nx: 55,
      ny: 92,
      address: '소룡동',
      placeName: '전북특별자치도 군산시 소룡동',
      nickname: '전북특별자치도 군산시 소룡동',
    },
    {
      id: 5111031000,
      nx: 73,
      ny: 134,
      address: '동면',
      placeName: '강원특별자치도 춘천시 동면',
      nickname: '강원특별자치도 춘천시 동면',
    },
    {
      id: 4872033000,
      nx: 81,
      ny: 79,
      address: '대의면',
      placeName: '경상남도 의령군 대의면',
      nickname: '경상남도 의령군 대의면',
    },
    {
      id: 4715032000,
      nx: 82,
      ny: 95,
      address: '남면',
      placeName: '경상북도 김천시 남면',
      nickname: '경상북도 김천시 남면',
    },
    {
      id: 4146357000,
      nx: 62,
      ny: 121,
      address: '마북동',
      placeName: '경기도 용인시 기흥구 마북동',
      nickname: '경기도 용인시 기흥구 마북동',
    },
  ];

  const result = useGetDailyWeather(eg);

  return (
    <>
      {result.map(({ data, isLoading }, i) => {
        if (isLoading || !data) {
          return <div key={`${i}-loading`}>로딩중...</div>; // 스켈레톤 추가 예정
        }

        return <Card key={data.nickname} data={data} />;
      })}
    </>
  );
};
