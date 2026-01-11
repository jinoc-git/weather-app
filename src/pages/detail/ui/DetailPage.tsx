import { useParams } from 'react-router-dom';

export const DetailPage = () => {
  const { cityId } = useParams<{ cityId: string }>();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] text-white">
      <h1 className="text-3xl font-bold mb-4">날씨 상세 정보</h1>
      <p className="text-lg text-gray-300">
        선택된 도시 ID:{' '}
        <span className="text-blue-400 font-mono">{cityId}</span>
      </p>
      {/* 상세 날씨 추가 예정 */}
    </div>
  );
};
