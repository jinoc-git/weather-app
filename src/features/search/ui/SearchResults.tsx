import type { CityDto } from '@/entities/search';
import { SearchResultItem } from '@/features/search/ui/SearchResultItem';
import { Search } from 'lucide-react';

type Props = {
  results: CityDto[];
  hasQuery: boolean; // 검색어가 입력되었는지 여부
  onSelect: (cityData: CityDto) => void;
};

export const SearchResults = ({ results, hasQuery, onSelect }: Props) => {
  // 검색 결과가 있을 때
  if (results.length > 0) {
    return (
      <ul className="flex flex-col pb-10">
        {results.map((data) => (
          <SearchResultItem
            key={`search-${data.id}`}
            city={data}
            onClick={() => onSelect(data)}
          />
        ))}
      </ul>
    );
  }

  // 검색어는 있는데 결과가 없을 때
  if (hasQuery) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 text-gray-500 gap-4 opacity-70">
        <div className="p-4 bg-white/5 rounded-full">
          <Search className="w-8 h-8 opacity-50" />
        </div>
        <span className="text-base font-medium">검색 결과가 없습니다.</span>
      </div>
    );
  }

  // 초기 상태
  return (
    <div className="mt-10 px-6 text-center">
      <p className="text-[15px] text-gray-400 leading-relaxed">
        찾으시는 지역의 <strong>동/읍/면</strong> 이름을
        <br />
        입력하면 더 빠르게 찾을 수 있습니다.
      </p>
    </div>
  );
};
