import { useState } from 'react';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { useCitySearch } from '@/features/search/model';
import { SearchHeader } from './SearchHeader';
import { SearchResults } from '@/features/search/ui/SearchResults';
import { PortalModal } from '@/shared';
import { type CityDto } from '@/entities/search';
import { useNavigate } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  close: () => void;
};

export const SearchModal = ({ isOpen, close }: Props) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const debouncedKeyword = useDebounce(inputValue, 300);
  const { results } = useCitySearch(debouncedKeyword);

  const handleClose = () => {
    setInputValue('');
    close();
  };

  const handleSelectCity = (cityData: CityDto) => {
    const encodeAddr = encodeURIComponent(cityData.address);
    setInputValue('');
    navigate(`/detail/${cityData.id}?addr=${encodeAddr}`);
    close();
  };

  if (!isOpen) return null;

  return (
    <PortalModal isOpen={isOpen} onClose={handleClose}>
      <SearchHeader
        value={inputValue}
        onChange={setInputValue}
        onClear={() => setInputValue('')}
        onClose={handleClose}
      />

      <div className="flex-1 overflow-y-auto px-2 pb-10 custom-scrollbar-dark ">
        <SearchResults
          results={results}
          hasQuery={!!inputValue}
          onSelect={handleSelectCity}
        />
      </div>
    </PortalModal>
  );
};
