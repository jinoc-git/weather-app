import { MapPin, Star } from 'lucide-react';

type Props = {
  placeName: string;
  isFixed: boolean;
  bookMark: boolean;
};

export const CardHeader = ({ placeName, isFixed, bookMark }: Props) => {
  return (
    <div className="w-full h-16 p-4 flex justify-between items-center text-white">
      <div className="flex gap-2 items-center  font-bold text-xl">
        <MapPin size={24} />
        <p>{placeName}</p>
      </div>
      {isFixed ? null : (
        <button>
          <Star
            size={24}
            strokeWidth={2}
            color={bookMark ? 'yellow' : undefined}
            fill={bookMark ? 'yellow' : undefined}
          />
        </button>
      )}
    </div>
  );
};
