import { WeatherVisual } from '@/shared/ui';
import type { WeatherStatus } from '@/shared/ui/weatherVisual/WeatherVisual';

export const HourlyWeather = () => {
  const eg: {
    time: string;
    status: WeatherStatus;
    tmp: number;
  }[] = [
    { time: '지금', status: 'clear', tmp: 24 },
    { time: '13시', status: 'cloudsun', tmp: 26 },
    { time: '14시', status: 'cloudsun', tmp: 27 },
    { time: '15시', status: 'rain', tmp: 25 },
    { time: '16시', status: 'clouds', tmp: 24 },
  ];

  return (
    <div className=" p-6 pb-10">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {eg.map((item, idx) => (
          <div
            key={idx}
            className={`w-1/3 min-w-[64px] max-w-[150px] flex flex-col items-center gap-3 p-3 rounded-2xl text-white `}>
            <span className="text-sm font-medium">{item.time}</span>
            <WeatherVisual
              weatherStatus={item.status}
              size={30}
              animate={false}
            />
            <span className="font-bold">{item.tmp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};
