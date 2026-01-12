import { motion } from 'motion/react';
import { Star, MapPin, ChevronRight } from 'lucide-react';
import type { CityDto } from '@/entities/search';

type BookmarkItemProps = {
  city: CityDto;
  onClick: () => void;
};

export const BookmarkItem = ({ city, onClick }: BookmarkItemProps) => {
  return (
    <motion.div
      layoutId={city.address}
      onClick={onClick}
      className="group flex items-center gap-4 p-3 rounded-xl bg-[#2c2f38]/50 hover:bg-[#2c2f38] border border-transparent hover:border-white/10 cursor-pointer active:scale-[0.98] transition-all">
      <div className="shrink-0 w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
        <Star size={18} className="text-yellow-400 fill-yellow-400" />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <h3 className="text-white font-medium truncate">
          {city.placeName || city.address}
        </h3>
        <p className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
          <MapPin size={10} />
          {city.address}
        </p>
      </div>
      <ChevronRight
        size={16}
        className="text-gray-500 group-hover:text-white"
      />
    </motion.div>
  );
};
