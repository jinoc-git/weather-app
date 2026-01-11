export const CardHeaderSkeleton = () => {
  return (
    <div className="relative w-full h-16 p-4 flex items-center justify-center">
      {/* 좌측 버튼 (Star) 자리 - Absolute */}
      <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/20" />

      {/* 중앙 컨텐츠 (Icon + Text) */}
      <div className="flex gap-2 items-center">
        {/* 아이콘 자리 */}
        <div className="w-6 h-6 rounded-full bg-white/20" />
        {/* 지명 텍스트 자리 */}
        <div className="w-24 h-6 rounded-md bg-white/20" />
      </div>

      {/* 우측 버튼 (Menu) 자리 - Absolute */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20" />
    </div>
  );
};
