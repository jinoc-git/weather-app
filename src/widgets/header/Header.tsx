import type { CityDto } from '@/entities/search';
import { SearchModal } from '@/features/search';
import { useModal } from '@/shared';
import { Menu, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const searchModal = useModal();

  const handleSelectCity = (cityData: CityDto) => {
    const encodeAddr = encodeURIComponent(cityData.address);
    navigate(`/detail/${cityData.id}?addr=${encodeAddr}`);
    searchModal.close();
  };

  return (
    <>
      <header className="w-full flex justify-between items-center py-4 px-6 relative z-10">
        <button className="p-2 bg-white/40 backdrop-blur-sm rounded-full hover:bg-white/60 transition text-slate-800 cursor-pointer">
          <Menu size={24} />
        </button>

        <button
          onClick={searchModal.open}
          className="p-2 bg-white/40 backdrop-blur-sm rounded-full hover:bg-white/60 transition text-slate-800 cursor-pointer">
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
