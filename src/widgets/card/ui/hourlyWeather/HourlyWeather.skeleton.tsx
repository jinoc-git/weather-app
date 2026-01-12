export const HourlyWeatherSkeleton = () => {
  return (
    <div className="p-6 pb-10 w-full overflow-hidden min-h-[138px]">
      <div className="flex gap-4 p-2 w-max">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`skeleton-card-${i}`}
            className="w-1/3 min-w-[90px] max-w-[170px] flex flex-col items-center gap-3 p-3 rounded-2xl bg-white/5">
            <div className="w-12 h-4 rounded bg-white/20" />
            <div className="w-8 h-8 rounded-full bg-white/20" />
            <div className="w-8 h-5 rounded bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
};
