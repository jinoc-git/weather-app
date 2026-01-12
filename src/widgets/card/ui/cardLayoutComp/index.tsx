import { cn } from '@/shared';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isSkeleton?: boolean;
  className?: string;
};

export const CardLayout = ({
  children,
  isSkeleton = false,
  className = '',
}: Props) => {
  return (
    <div
      className={cn(
        'relative w-full max-w-[calc(100vw-32px)] md:max-w-[400px] h-[632px]',
        'rounded-[40px] shadow-2xl transition-all duration-300',
        isSkeleton && 'animate-pulse',
        className
      )}>
      <div
        className={cn(
          'flex flex-col justify-between gap-5 w-full h-full rounded-[40px] border overflow-hidden',
          isSkeleton
            ? 'border-white/20 bg-white/5 backdrop-blur-sm'
            : 'border-white/40 text-slate-700'
        )}>
        {children}
      </div>
    </div>
  );
};
