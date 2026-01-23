import { useNavigate } from 'react-router-dom';

type Props = {
  type: '잘못된 접근' | '데이터 없음';
};

export const DetailPageError = ({ type }: Props) => {
  const navigate = useNavigate();

  const config = {
    '잘못된 접근': {
      title: '잘못된 접근입니다.',
      message: '올바른 주소로 다시 접속해주세요.',
      buttonText: '홈으로 돌아가기',
      action: () => navigate('/', { replace: true }),
    },
    '데이터 없음': {
      title: '데이터가 없습니다.',
      message:
        '해당 도시의 날씨 정보를 찾을 수 없습니다.\n다른 지역을 검색해주세요.',
      buttonText: '뒤로 가기',
      action: () => navigate(-1),
    },
  };

  const { title, message, buttonText, action } = config[type];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pt-15 px-6 text-center animate-fadeIn">
      <div className="mb-12 space-y-3">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 sm:text-2xl whitespace-pre-wrap leading-relaxed">
          {message}
        </p>
      </div>

      <button
        onClick={action}
        className="px-12 py-4 text-xl font-bold text-white transition-all transform bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600">
        {buttonText}
      </button>
    </div>
  );
};
