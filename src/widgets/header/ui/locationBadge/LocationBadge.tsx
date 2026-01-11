import { MapPin, RotateCw, Loader2 } from 'lucide-react';
import { cn } from '@/shared';

type Props = {
  placeName: string;
  isLoading: boolean;
  onRefresh: () => void;
  className?: string;
};

export const LocationBadge = ({
  placeName,
  isLoading,
  onRefresh,
  className,
}: Props) => {
  return (
    <button
      onClick={onRefresh}
      disabled={isLoading}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200',
        'bg-white/10 backdrop-blur-md border border-white/10',
        'hover:bg-white/20 active:scale-95',
        'text-white cursor-pointer disabled:cursor-wait',
        className
      )}>
      {isLoading ? (
        <Loader2 size={14} className="animate-spin text-white/70 shrink-0" />
      ) : (
        <MapPin size={14} className="text-white fill-white/20 shrink-0" />
      )}

      <span className="text-[15px] font-semibold tracking-tight leading-none pt-0.5 max-w-[120px] truncate">
        {placeName}
      </span>

      {!isLoading && (
        <RotateCw size={12} className="text-white/50 ml-0.5 shrink-0" />
      )}
    </button>
  );
};
