import type { WeatherStatus } from '@/shared/ui';

type WeatherUI = {
  status: WeatherStatus;
  text: string;
};

/**
 * 날씨 데이터(SKY, PTY, SNO)를 받아 UI 상태(아이콘, 텍스트)로 변환
 */
export const getWeatherUI = (
  sky: number,
  pty: number,
  sno: number = 0
): WeatherUI => {
  // 강수 형태(PTY) 확인
  if (pty > 0) {
    switch (pty) {
      case 1:
        return { status: 'rain', text: '비' };
      case 2:
        return { status: 'snow', text: '비 또는 눈' };
      case 3: {
        let snowText = '';
        if (sno < 1) snowText = '눈이 조금 와요';
        else if (sno < 5) snowText = '눈이 와요';
        else if (sno >= 5) snowText = '눈이 많이 와요';

        return { status: 'snow', text: snowText };
      }
      case 4:
        return { status: 'rain', text: '소나기' };
      default:
        return { status: 'rain', text: '비' };
    }
  }

  // 강수가 없으면 하늘(SKY) 상태 확인
  switch (sky) {
    case 1:
      return { status: 'clear', text: '맑음' };
    case 3:
      return { status: 'cloudsun', text: '흐림' };
    case 4:
      return { status: 'clouds', text: '구름 많음' };
    default:
      return { status: 'clear', text: '맑음' };
  }
};
