export const CardHeaderSkeleton = () => {
  return (
    <div className="w-full h-[88px]">
      <div className="relative w-full h-16 p-4 pb-0 flex items-center justify-center">
        <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/20" />
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-full bg-white/20" />
          <div className="w-24 h-6 rounded-md bg-white/20" />
        </div>
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20" />
      </div>
      <div className="flex justify-center">
        <div className="w-32 h-4 mt-2 rounded bg-white/10" />
      </div>
    </div>
  );
};
