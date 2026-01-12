export const CardInfoSkeleton = () => {
  return (
    <>
      <div className="mt-4 mb-4">
        <div className="w-[140px] h-[140px] rounded-full bg-white/10" />
      </div>
      <div className="w-40 h-24 mt-4 rounded-2xl bg-white/20" />
      <div className="w-32 h-6 mt-2 rounded-md bg-white/20" />
      <div className="flex items-center gap-4 mt-2">
        <div className="w-16 h-5 rounded bg-white/20" />
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <div className="w-16 h-5 rounded bg-white/20" />
      </div>
    </>
  );
};
