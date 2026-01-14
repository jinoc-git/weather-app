type Props = {
  text: string;
  nowTmp: number;
  todayMax: number;
  todayMin: number;
};

export const CardInfo = ({ text, nowTmp, todayMax, todayMin }: Props) => {
  const tmp = nowTmp == Infinity ? '정보 없음' : nowTmp + '°';
  return (
    <>
      <h3 className="text-8xl font-bold text-white mt-4 leading-none tracking-tighter">
        {tmp}
      </h3>
      <p className="text-xl font-medium text-white mt-2">{text}</p>

      <div className="flex items-center gap-4 mt-2 text-base font-semibold text-white">
        <span>최고: {todayMax}°</span>
        <span className="w-1 h-1 bg-white rounded-full"></span>
        <span>최저: {todayMin}°</span>
      </div>
    </>
  );
};
