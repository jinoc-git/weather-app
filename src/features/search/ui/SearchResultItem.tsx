import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import type { CityDto } from '@/entities/search';

type Props = {
  city: CityDto; // 렌더링할 도시 데이터 객체
  onClick: () => void; // 클릭 시 실행될 함수 (부모에서 전달받음)
};

export const SearchResultItem = ({ city, onClick }: Props) => {
  return (
    <motion.li
      // 1. 터치 인터랙션: 누르면 살짝 작아지고 배경색이 밝아짐 (앱 같은 느낌)
      whileTap={{ scale: 0.98, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors">
      {/* 2. 아이콘 영역: 둥근 원 안에 핀 아이콘 배치 */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 shrink-0">
        <MapPin className="w-5 h-5 text-gray-300" />
      </div>

      {/* 3. 텍스트 영역: 넘치면 ... 처리 (truncate) */}
      <div className="flex flex-col overflow-hidden">
        {/* 주요 지명 (예: 효자동) - 크고 진하게 */}
        <span className="text-[17px] font-semibold text-white truncate leading-tight">
          {city.placeName}
        </span>

        {/* 전체 주소 (예: 서울특별시 종로구 효자동) - 작고 흐리게 */}
        <span className="text-[14px] text-gray-400 truncate leading-tight mt-1">
          {city.address}
        </span>
      </div>
    </motion.li>
  );
};
