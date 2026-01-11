export const CardHeaderSkeleton = () => {
  return (
    <div className="w-full h-16 p-4 flex justify-between items-center">
      {/* 북마크 버튼 자리 */}
      <div className="w-6 h-6 rounded-full bg-white/20" />
      <div className="flex gap-2 items-center">
        {/* 아이콘 자리 */}
        <div className="w-6 h-6 rounded-full bg-white/20" />
        {/* 지역 이름 자리 */}
        <div className="w-24 h-6 rounded-md bg-white/20" />
      </div>
    </div>
  );
};
