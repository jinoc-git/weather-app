import { useLocationStore } from '@/entities/location';
import type { CityDto } from '@/entities/search';
import {
  MenuToggle,
  useModal,
  LocationBadge,
  LocationBadgeSkeleton,
} from '@/shared';
import { Sidebar } from '@/widgets/sidebar';
import { Home } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

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
        <div className="flex items-center relative z-10">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-full transition text-white hover:bg-white/20 cursor-pointer"
            aria-label="홈으로 이동">
            <Home size={24} />
          </button>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 md:hidden">
          {renderLocationUI()}
        </div>

        <div className="flex items-center relative z-10">
          <MenuToggle
            isOpen={sidebar.isOpen}
            onClick={sidebar.open}
            className="-mr-2"
          />
        </div>
      </header>

      <Sidebar
        isOpen={sidebar.isOpen}
        onClose={sidebar.close}
        locationUI={renderLocationUI()}
        onItemClick={handleSelectCity}
      />
    </>
  );
};
