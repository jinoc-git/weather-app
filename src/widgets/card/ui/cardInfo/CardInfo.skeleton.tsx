export const CardInfoSkeleton = () => {
  return (
    <>
      {/* 2. 메인 날씨 비주얼 (WeatherVisual) 자리 */}
      <div className="mt-4 mb-4">
        {/* size=140에 대응하는 원형 */}
        <div className="w-[140px] h-[140px] rounded-full bg-white/10" />
      </div>
      {/* 3. 온도 (text-8xl) 자리 */}
      <div className="w-40 h-20 mt-4 rounded-2xl bg-white/20" />
      {/* 4. 날씨 상태 텍스트 (text-xl) 자리 */}
      <div className="w-20 h-6 mt-4 rounded-md bg-white/20" />
      {/* 5. 최고/최저 온도 자리 */}
      <div className="flex items-center gap-4 mt-4">
        <div className="w-16 h-5 rounded bg-white/20" />
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className="w-16 h-5 rounded bg-white/20" />
      </div>
    </>
  );
};
