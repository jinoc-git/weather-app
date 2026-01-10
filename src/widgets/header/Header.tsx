import type { CityDto } from '@/entities/search';
import { SearchModal } from '@/features/search';
import { useModal } from '@/shared';
import { Menu, Search } from 'lucide-react';

export const Header = () => {
  const searchModal = useModal();

  const handleSelectCity = (cityData: CityDto) => {
    console.log(cityData);
    // 상세페이지 이동 추가 예정
    searchModal.close();
  };

  return (
    <>
      <header className="w-full flex justify-between items-center py-4 px-6 relative z-10">
        <button className="p-2 bg-white/40 backdrop-blur-sm rounded-full hover:bg-white/60 transition text-slate-800">
          <Menu size={24} />
        </button>

        <button
          onClick={searchModal.open}
          className="p-2 bg-white/40 backdrop-blur-sm rounded-full hover:bg-white/60 transition text-slate-800">
          <Search size={24} />
        </button>
      </header>

      <SearchModal
        isOpen={searchModal.isOpen}
        onClose={searchModal.close}
        onSelect={handleSelectCity}
      />
    </>
  );
};
