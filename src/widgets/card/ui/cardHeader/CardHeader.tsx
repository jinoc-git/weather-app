import type { DailyWeatherData } from '@/entities/weather';
import { CardMenu } from '@/features/bookmark';
import { LocateFixed, MapPin, Star } from 'lucide-react';

type Props = {
  data: DailyWeatherData;
  isCurrentLocation?: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
};

export const CardHeader = ({
  data,
  isCurrentLocation,
  isBookmarked,
  onToggleBookmark,
}: Props) => {
  const displayName = data.nickname ?? data.placeName;
  return (
    <div className="relative w-full h-16 p-4 flex items-center text-white justify-center">
      {isCurrentLocation ? null : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark();
          }}
          className="absolute top-4 left-4 p-1.5 rounded-full hover:bg-white/10 transition active:scale-90 cursor-pointer">
          <Star
            size={24}
            strokeWidth={2}
            color={isBookmarked ? '#Facc15' : 'white'}
            fill={isBookmarked ? '#Facc15' : 'none'}
            className="transition-colors duration-300"
          />
        </button>
      )}

      <div className="flex gap-2 items-center font-bold text-xl">
        {isCurrentLocation ? (
          <LocateFixed size={24} className="shrink-0 text-white " />
        ) : (
          <MapPin size={24} className="shrink-0" />
        )}
        <p>{displayName}</p>
      </div>

      {!isCurrentLocation && isBookmarked && (
        <CardMenu address={data.address} currentNickname={displayName} />
      )}
    </div>
  );
};
