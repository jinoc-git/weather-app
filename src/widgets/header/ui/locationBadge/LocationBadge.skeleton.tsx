import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
};

export const LocationBadgeSkeleton = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full',
        'bg-white/5 border border-white/5 backdrop-blur-sm',
        'animate-pulse',
        className
      )}>
      {/* 아이콘 자리 (원형) */}
      <div className="w-3.5 h-3.5 rounded-full bg-white/20 shrink-0" />

      {/* 텍스트 자리 (직사각형) */}
      <div className="w-16 h-4 rounded bg-white/20" />

      {/* 새로고침 아이콘 자리 (작은 원) */}
      <div className="w-3 h-3 rounded-full bg-white/10 ml-0.5" />
    </div>
  );
};
