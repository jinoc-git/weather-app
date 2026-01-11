export const HourlyWeatherSkeleton = () => {
  return (
    <div className="p-6 pb-10 w-full overflow-hidden">
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`skeleton-card-${i}`}
            className="w-1/3 min-w-[64px] max-w-[150px] flex flex-col items-center gap-3 p-3 rounded-2xl bg-white/5">
            {/* 시간 */}
            <div className="w-8 h-4 rounded bg-white/20" />
            {/* 아이콘 */}
            <div className="w-8 h-8 rounded-full bg-white/20" />
            {/* 온도 */}
            <div className="w-8 h-5 rounded bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
};
