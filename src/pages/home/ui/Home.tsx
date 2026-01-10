import { Card } from '@/widgets/card';
import { useGetDailyWeather } from '@/features/weather/api';

export const HomePage = () => {
  const eg = {
    tmp: 24,
    tmn: 18,
    tmx: 28,
  };

  const { data } = useGetDailyWeather({ nx: 55, ny: 127 });
  console.log(data);
  return (
    <>
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
      <Card tmp={eg.tmp} tmn={eg.tmn} tmx={eg.tmx} />
    </>
  );
};
