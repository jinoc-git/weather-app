import { CardHeaderSkeleton } from '@/widgets/card/ui/cardHeader';
import { CardInfoSkeleton } from '@/widgets/card/ui/cardInfo';
import { CardLayout } from '@/widgets/card/ui/cardLayoutComp';
import { HourlyWeatherSkeleton } from '@/widgets/card/ui/hourlyWeather';

export const CardSkeleton = () => {
  return (
    <CardLayout isSkeleton={true}>
      <div className="flex flex-col items-center justify-center">
        <CardHeaderSkeleton />
        <CardInfoSkeleton />
      </div>
      <HourlyWeatherSkeleton />
    </CardLayout>
  );
};
