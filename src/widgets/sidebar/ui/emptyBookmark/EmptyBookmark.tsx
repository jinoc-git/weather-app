import { Star } from 'lucide-react';

export const EmptyBookmark = () => {
  return (
    <div className="py-10 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
      <Star size={32} className="opacity-20" />
      <p>즐겨찾기한 장소가 없습니다.</p>
    </div>
  );
};
