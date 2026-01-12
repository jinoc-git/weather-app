import { getWeatherUI, type DailyWeatherData } from '@/entities/weather';
import { WeatherVisual } from '@/shared';
import { motion } from 'motion/react';
import { useEffectEvent, useLayoutEffect, useRef, useState } from 'react';

type Props = {
  data: DailyWeatherData;
};

export const HourlyWeather = ({ data }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  const updateContentDragArea = useEffectEvent((distance: number) => {
    setConstraints({ left: distance > 0 ? 0 : distance, right: 0 });
  });

  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const contentWidth = contentRef.current.scrollWidth;
    const wrapperWidth = wrapperRef.current.offsetWidth;
    const paddingBuffer = 48;
    const distance = -(contentWidth - wrapperWidth + paddingBuffer);
    updateContentDragArea(distance);
  }, [data.items]);

  return (
    <div
      ref={wrapperRef}
      className="p-6 pb-10 overflow-x-auto no-scrollbar w-full block min-w-0 min-h-[138px]">
      <motion.div
        ref={contentRef}
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.2}
        whileDrag={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          cursor: 'grab',
          scale: 0.99,
        }}
        transition={{ duration: 0.2 }}
        className="flex gap-4 p-2 rounded-2xl w-max">
        {data.items.map((item) => {
          const { status } = getWeatherUI(item.sky, item.pty, item.sno);
          const hour = parseInt(item.time.substring(0, 2), 10);

          return (
            <div
              key={`${data.placeName}-${item.dt}`}
              className="w-1/3 min-w-[90px] max-w-[170px] flex flex-col items-center gap-3 p-3 rounded-2xl text-white">
              <span className="text-sm font-medium">
                {hour < 12 ? '오전' : '오후'} {hour % 12 || 12}시
              </span>
              <WeatherVisual weatherStatus={status} size={30} animate={false} />
              <span className="font-bold">{item.tmp}°</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
