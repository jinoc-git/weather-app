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
    blob1: 'bg-yellow-300',
    blob2: 'bg-orange-400',
    Icon: Sun,
    iconColor: 'text-white',
  },
  cloudsun: {
    blob1: 'bg-purple-300',
    blob2: 'bg-yellow-300',
    Icon: CloudSun,
    iconColor: 'text-gray-100',
  },
  clouds: {
    blob1: 'bg-purple-300',
    blob2: 'bg-yellow-300',
    Icon: Cloud,
    iconColor: 'text-gray-100',
  },
  rain: {
    blob1: 'bg-blue-500',
    blob2: 'bg-cyan-300',
    Icon: CloudRain,
    iconColor: 'text-white',
  },
  snow: {
    blob1: 'bg-white',
    blob2: 'bg-blue-200',
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
      className={`relative w-full flex items-center justify-center shrink-0 ${className}`}>
      {background ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`absolute -top-4 -left-4 w-32 h-32 md:w-40 md:h-40 ${blob1} rounded-full mix-blend-overlay filter blur-3xl opacity-60 ${
              animate ? 'animate-blob' : ''
            } `}></div>
          <div
            className={`absolute top-4 -right-4 w-32 h-32 md:w-40 md:h-40 ${blob2} rounded-full mix-blend-overlay filter blur-3xl opacity-60 ${
              animate ? 'animate-blob animation-delay-2000' : ''
            }`}></div>
        </div>
      ) : null}

      <div className="relative z-1 drop-shadow-2xl">
        <Icon
          size={size}
          className={`${iconColor} transition-all duration-500`}
          strokeWidth={size > 60 ? 1.5 : undefined}
        />
      </div>
    </div>
  );
};
