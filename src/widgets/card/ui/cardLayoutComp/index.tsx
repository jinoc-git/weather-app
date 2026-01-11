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
      className={`
        relative flex-1 md:flex-none w-full h-full max-h-[700px] max-w-[400px] 
        rounded-[40px] shadow-2xl transition-all duration-300
        ${isSkeleton ? 'animate-pulse' : ''}
        ${className}
      `}>
      <div
        className={`
          flex flex-col justify-between gap-5 w-full h-full rounded-[40px] 
          border overflow-hidden
          ${
            isSkeleton
              ? 'border-white/20 bg-white/5 backdrop-blur-sm' // 스켈레톤 스타일
              : 'border-white/40 text-slate-700' // 일반 카드 스타일
          }
        `}>
        {children}
      </div>
    </div>
  );
};
