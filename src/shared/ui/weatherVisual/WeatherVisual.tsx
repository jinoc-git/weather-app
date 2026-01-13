import { cn } from '@/shared/lib';
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  Snowflake,
  type LucideIcon,
} from 'lucide-react';

export type WeatherStatus = 'clear' | 'cloudsun' | 'clouds' | 'rain' | 'snow';

type WeatherStyle = {
  blob1: string; // 첫 번째 빛 번짐 색상
  blob2: string; // 두 번째 빛 번짐 색상
  Icon: LucideIcon;
  iconColor: string; // 아이콘 색상
};

const weatherStyles: Record<WeatherStatus, WeatherStyle> = {
  clear: {
    blob1: 'bg-yellow-100 dark:bg-amber-500/30',
    blob2: 'bg-orange-200 dark:bg-orange-500/30',
    Icon: Sun,
    iconColor: 'text-white',
  },
  cloudsun: {
    blob1: 'bg-purple-300 dark:bg-indigo-500/30',
    blob2: 'bg-yellow-300 dark:bg-yellow-500/20',
    Icon: CloudSun,
    iconColor: 'text-white',
  },
  clouds: {
    blob1: 'bg-gray-400 dark:bg-slate-500/30',
    blob2: 'bg-purple-400 dark:bg-purple-900/40',
    Icon: Cloud,
    iconColor: 'text-white',
  },
  rain: {
    blob1: 'bg-blue-500 dark:bg-blue-600/40',
    blob2: 'bg-cyan-300 dark:bg-cyan-700/30',
    Icon: CloudRain,
    iconColor: 'text-white',
  },
  snow: {
    blob1: 'bg-white dark:bg-white/20',
    blob2: 'bg-blue-200 dark:bg-sky-500/30',
    Icon: Snowflake,
    iconColor: 'text-white',
  },
};

type Props = {
  weatherStatus: WeatherStatus;
  size?: number;
  animate: boolean;
  background?: boolean;
  className?: string;
};

export const WeatherVisual = ({
  weatherStatus,
  size = 20,
  animate,
  background,
  className,
}: Props) => {
  const { blob1, blob2, Icon, iconColor } = weatherStyles[weatherStatus];

  return (
    <div
      className={cn(
        'relative w-full flex items-center justify-center shrink-0',
        className
      )}
      style={{ height: size }}>
      {background ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={cn(
              'absolute -top-4 -left-4 w-32 h-32 md:w-40 md:h-40 rounded-full filter blur-[50px]',
              'opacity-60 dark:opacity-40',
              blob1,
              animate && 'animate-blob'
            )}
          />
          <div
            className={cn(
              'absolute top-4 -right-4 w-32 h-32 md:w-40 md:h-40 rounded-full filter blur-[50px]',
              'opacity-60 dark:opacity-40',
              blob2,
              animate && 'animate-blob animation-delay-2000'
            )}
          />
        </div>
      ) : null}

      <div className="relative z-1 drop-shadow-2xl">
        <Icon
          size={size}
          className={`${iconColor} transition-all duration-500`}
          strokeWidth={size > 60 ? 1.5 : 2}
        />
      </div>
    </div>
  );
};
