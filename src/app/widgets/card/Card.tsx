import { HourlyWeather } from '@/app/widgets/card/ui';
import { WeatherVisual } from '@/shared/ui';

type Props = {
  tmp: number; // 1시간 기온
  tmn: number; // 일 최저 기온
  tmx: number; // 일 최고 기온
};

export const Card = ({ tmp, tmn, tmx }: Props) => {
  return (
    <div className="relative flex-1 flex flex-col justify-between gap-5 w-full h-full max-h-[700px] pt-10 bg-white/30 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/40 overflow-hidden text-slate-700 ">
      <div className=" flex flex-col items-center justify-center">
        <WeatherVisual weatherStatus="clear" size={140} animate background />

        <h3 className="text-8xl font-bold text-white mt-4 tracking-tighter">
          {tmp}°
        </h3>
        <p className="text-xl font-medium text-white mt-2">대체로 맑음</p>

        <div className="flex items-center gap-4 mt-2 text-base font-semibold text-white">
          <span>최고: {tmx}°</span>
          <span className="w-1 h-1 bg-white rounded-full"></span>
          <span>최저: {tmn}°</span>
        </div>
      </div>

      <HourlyWeather />
    </div>
  );
};
