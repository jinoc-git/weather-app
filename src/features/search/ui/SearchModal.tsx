import { useState } from 'react';
import { useDebounce } from '@/shared/lib/useDebounce';
import { useCitySearch } from '@/features/search/model';
import { SearchHeader } from './SearchHeader';
import { SearchResults } from '@/features/search/ui/SearchResults';
import { PortalModal } from '@/shared';
import type { CityDto } from '@/entities/search';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cityData: CityDto) => void;
};

export const SearchModal = ({ isOpen, onClose, onSelect }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedKeyword = useDebounce(inputValue, 300);
  const { results } = useCitySearch(debouncedKeyword);

  const handleClose = () => {
    setInputValue('');
    onClose();
  };

  const handleSelect = (cityData: CityDto) => {
    onSelect(cityData);
    handleClose();
  };

  return (
    <PortalModal isOpen={isOpen}>
      <SearchHeader
        value={inputValue}
        onChange={setInputValue}
        onClear={() => setInputValue('')}
        onClose={handleClose}
      />

      <div className="flex-1 overflow-y-auto px-2 pb-10 custom-scrollbar-dark">
        <SearchResults
          results={results}
          hasQuery={!!inputValue}
          onSelect={handleSelect}
        />
      </div>
    </PortalModal>
  );
};
