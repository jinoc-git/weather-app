import { MapPin, RotateCw, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/shared';

type Props = {
  placeName: string;
  isLoading: boolean;
  isError?: boolean;
  onRefresh: () => void;
  className?: string;
};

export const LocationBadge = ({
  placeName,
  isLoading,
  isError,
  onRefresh,
  className,
}: Props) => {
  return (
    <button
      onClick={onRefresh}
      disabled={isLoading}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200',
        isError
          ? 'bg-red-500/20 border-red-500/30 hover:bg-red-500/30'
          : 'bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20',
        'active:scale-95 cursor-pointer disabled:cursor-wait',
        className
      )}>
      {isLoading ? (
        <Loader2 size={14} className="animate-spin text-white/70 shrink-0" />
      ) : isError ? (
        <AlertCircle size={14} className="text-red-200 shrink-0" />
      ) : (
        <MapPin size={14} className="text-white fill-white/20 shrink-0" />
      )}

      <span
        className={cn(
          'text-[15px] font-semibold tracking-tight leading-none pt-0.5 max-w-[120px] truncate',
          isError ? 'text-red-100' : 'text-white'
        )}>
        {isLoading ? '...' : isError ? '위치 찾기 실패' : placeName}
      </span>

      {!isLoading && (
        <RotateCw
          size={12}
          className={cn(
            'ml-0.5 shrink-0',
            isError ? 'text-red-200' : 'text-white/50'
          )}
        />
      )}
    </button>
  );
};
