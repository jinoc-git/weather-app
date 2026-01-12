import { WeatherVisual } from '@/shared/ui';
import { getWeatherUI, type DailyWeatherData } from '@/entities/weather';
import { useBookmarkAction } from '@/features/bookmark';
import { CardLayout } from '@/widgets/card/ui/cardLayoutComp';
import { CardHeader } from '@/widgets/card/ui/cardHeader';
import { CardInfo } from '@/widgets/card/ui/cardInfo';
import { HourlyWeather } from '@/widgets/card/ui/hourlyWeather';
import { useNavigate } from 'react-router-dom';
import { cn, stopPropagation } from '@/shared';

type Props = {
  isCurrentLocation?: boolean;
  data: DailyWeatherData;
  preventNavigation?: boolean;
};

export const Card = ({
  data,
  isCurrentLocation,
  preventNavigation = false,
}: Props) => {
  const navigate = useNavigate();
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

  const handleCardClick = () => {
    if (preventNavigation) return;
    const encodeAddr = encodeURIComponent(data.address);
    navigate(`/detail/${data.id}?addr=${encodeAddr}`);
  };

  const handleToggleBookmark = (e: React.MouseEvent | React.TouchEvent) => {
    stopPropagation(e);
    toggleBookmark();
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'transition-transform duration-200',
        preventNavigation
          ? 'cursor-default'
          : [
              'cursor-pointer active:scale-[0.97]',
              'has-[button:active]:scale-100',
            ]
      )}>
      <CardLayout>
        <div className="flex flex-col items-center justify-center">
          <CardHeader
            data={data}
            isCurrentLocation={isCurrentLocation}
            isBookmarked={isBookmarked}
            onToggleBookmark={handleToggleBookmark}
          />
          <WeatherVisual weatherStatus={status} size={140} animate background />
          <CardInfo
            text={text}
            nowTmp={data.nowTmp}
            todayMax={data.todayMax}
            todayMin={data.todayMin}
          />
        </div>

        <div
          onClick={stopPropagation}
          onTouchStart={stopPropagation}
          className="cursor-auto">
          <HourlyWeather data={data} />
        </div>
      </CardLayout>
    </div>
  );
};
