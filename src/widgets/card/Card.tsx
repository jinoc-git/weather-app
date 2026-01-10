import { CardHeader } from '@/widgets/card/ui/cardHeader';
import { WeatherVisual } from '@/shared/ui';
import { HourlyWeather } from '@/widgets/card/ui';
import type { DailyWeatherData } from '@/entities/weather/model';
import { getWeatherUI } from '@/entities/weather';

type Props = {
  data: DailyWeatherData;
};

export const Card = ({ data }: Props) => {
  const { status, text } = getWeatherUI(
    data.nowSky ?? 1,
    data.nowPty ?? 0,
    data.nowSno ?? 0
  );

  return (
    <div className="relative flex-1 md:flex-none w-full h-full max-h-[700px] max-w-[400px] rounded-[40px] shadow-2xl">
      <div className="flex flex-col justify-between gap-5 w-full h-full rounded-[40px] text-slate-700 border border-white/40 ">
        <div className=" flex flex-col items-center justify-center">
          <CardHeader
            placeName={data.placeName}
            nickname={data.nickname}
            isFixed={false}
            bookMark
          />
          <WeatherVisual weatherStatus={status} size={140} animate background />

          <h3 className="text-8xl font-bold text-white mt-4 tracking-tighter">
            {data.nowTmp}°
          </h3>
          <p className="text-xl font-medium text-white mt-2">{text}</p>

          <div className="flex items-center gap-4 mt-2 text-base font-semibold text-white">
            <span>최고: {data.todayMax}°</span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span>최저: {data.todayMin}°</span>
          </div>
        </div>

        <HourlyWeather />
      </div>
    </div>
  );
};
