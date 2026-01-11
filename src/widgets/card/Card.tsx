import { WeatherVisual } from '@/shared/ui';
import { getWeatherUI, type DailyWeatherData } from '@/entities/weather';
import {
  CardHeader,
  CardInfo,
  CardLayout,
  HourlyWeather,
} from '@/widgets/card/ui';
import { useBookmarkAction } from '@/features/bookmark';

type Props = {
  isCurrentLocation?: boolean;
  data: DailyWeatherData;
};

export const Card = ({ data, isCurrentLocation }: Props) => {
  const { status, text } = getWeatherUI(
    data.nowSky ?? 1,
    data.nowPty ?? 0,
    data.nowSno ?? 0
  );

  const { isBookmarked, toggleBookmark } = useBookmarkAction({
    id: data.id,
    nx: data.nx,
    ny: data.ny,
    address: data.address,
    placeName: data.placeName,
  });

  return (
    <CardLayout>
      <div className=" flex flex-col items-center justify-center">
        <CardHeader
          data={data}
          isCurrentLocation={isCurrentLocation}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
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
