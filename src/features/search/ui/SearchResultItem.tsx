import { motion } from 'motion/react';
import { MapPin, Star } from 'lucide-react';
import type { CityDto } from '@/entities/search';
import { cn } from '@/shared';

type Props = {
  city: CityDto;
  isBookmarked: boolean;
  onClick: () => void;
};

export const SearchResultItem = ({ city, isBookmarked, onClick }: Props) => {
  return (
    <motion.li
      whileTap={{ scale: 0.98, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
      {/* 아이콘 영역 */}
      <div
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors',
          isBookmarked ? 'bg-yellow-500/20' : 'bg-white/10'
        )}>
        {isBookmarked ? (
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ) : (
          <MapPin className="w-5 h-5 text-gray-300" />
        )}
      </div>

      {/* 2. 텍스트 영역 */}
      <div className="flex flex-col overflow-hidden flex-1">
        <div className="flex items-center gap-2">
          {/* 지명 */}
          <span className="text-[17px] font-semibold text-white truncate leading-tight">
            {city.placeName}
          </span>
        </div>

        {/* 전체 주소 */}
        <span className="text-[14px] text-gray-400 truncate leading-tight mt-1">
          {city.address}
        </span>
      </div>
    </motion.li>
  );
};
