import { WeatherVisual } from '@/shared/ui';
import { getWeatherUI, type DailyWeatherData } from '@/entities/weather';
import {
  CardHeader,
  CardInfo,
  CardLayout,
  HourlyWeather,
} from '@/widgets/card/ui';

type Props = {
  data: DailyWeatherData;
};

export const Card = ({ data }: Props) => {
  const { status, text } = getWeatherUI(
    data.nowSky ?? 1,
    data.nowPty ?? 0,
    data.nowSno ?? 0
  );

  return (
    <CardLayout>
      <div className=" flex flex-col items-center justify-center">
        <CardHeader
          placeName={data.placeName}
          nickname={data.nickname}
          isFixed={false}
          bookMark
        />
        <WeatherVisual weatherStatus={status} size={140} animate background />
        <CardInfo
          text={text}
          nowTmp={data.nowTmp}
          todayMax={data.todayMax}
          todayMin={data.todayMin}
        />
      </div>

      <HourlyWeather data={data} />
    </CardLayout>
  );
};
