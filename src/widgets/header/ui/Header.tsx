import { useLocationStore } from '@/entities/location';
import type { CityDto } from '@/entities/search';
import { SearchModal } from '@/features/search';
import {
  MenuToggle,
  useModal,
  LocationBadge,
  LocationBadgeSkeleton,
} from '@/shared';
import { Sidebar } from '@/widgets/sidebar';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const searchModal = useModal();
  const sidebar = useModal();
  const { myLocation, isLoading, error, fetchMyLocation } = useLocationStore();

  useEffect(() => {
    fetchMyLocation();
  }, [fetchMyLocation]);

  useEffect(() => {
    if (error) toast.error(error, { id: 'location-error' });
  }, [error]);

  const handleSelectCity = (cityData: CityDto) => {
    const encodeAddr = encodeURIComponent(cityData.address);
    navigate(`/detail/${cityData.id}?addr=${encodeAddr}`);
    searchModal.close();
    sidebar.close();
  };

  const handleRefreshLocation = () => {
    if (isLoading) return;
    fetchMyLocation();
  };

  const renderLocationUI = (className?: string) => {
    if (!myLocation && isLoading) {
      return <LocationBadgeSkeleton className={className} />;
    }

    return (
      <LocationBadge
        placeName={myLocation?.placeName ?? ''}
        isLoading={isLoading}
        isError={!!error}
        onRefresh={handleRefreshLocation}
        className={className}
      />
    );
  };

  return (
    <>
      <header className="w-full flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3 relative z-10">
          <MenuToggle
            isOpen={sidebar.isOpen}
            onClick={sidebar.open}
            className="-ml-2"
          />
          <div className="hidden md:block">{renderLocationUI()}</div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden z-0">
          {renderLocationUI()}
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <button
            onClick={searchModal.open}
            className="p-2 -mr-2 rounded-full transition text-white hover:bg-white/20 cursor-pointer">
            <Search size={24} />
          </button>
        </div>
      </header>

      <Sidebar
        isOpen={sidebar.isOpen}
        onClose={sidebar.close}
        locationUI={renderLocationUI()}
        onItemClick={handleSelectCity}
      />

      <SearchModal
        isOpen={searchModal.isOpen}
        onClose={searchModal.close}
        onSelect={handleSelectCity}
      />
    </>
  );
};
