import { Search, X, ChevronLeft } from 'lucide-react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onClose: () => void;
};

export const SearchHeader = ({ value, onChange, onClear, onClose }: Props) => {
  return (
    <div className="flex items-center gap-3 p-4 pt-12 pb-4 shrink-0 bg-[#1a1c22]">
      {/* 뒤로가기 */}
      <button
        onClick={onClose}
        className="p-2 -ml-1 text-gray-300 active:text-white active:bg-white/10 rounded-full transition-colors">
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* 입력창 컨테이너 */}
      <div className="flex-1 flex items-center bg-[#2c2f38] rounded-full px-4 py-3 border border-white/5 relative">
        <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />

        <input
          autoFocus
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="도시, 구, 동을 입력하세요"
          className="bg-transparent w-full outline-none text-[17px] text-white placeholder:text-gray-500 leading-normal"
        />

        {/* 지우기 버튼 */}
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 p-1 rounded-full bg-gray-500/50 hover:bg-gray-500 text-gray-200 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
