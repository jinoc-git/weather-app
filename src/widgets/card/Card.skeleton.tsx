import {
  CardHeaderSkeleton,
  CardInfoSkeleton,
  CardLayout,
  HourlyWeatherSkeleton,
} from '@/widgets/card/ui';

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
