import type { CityDto } from '@/entities/search';
import { parseWeatherValue } from '@/entities/weather/api/lib';
import type { WeatherInfo } from '@/entities/weather/model';
import type { DailyWeatherData, HourlyWeather } from '@/entities/weather/model';
import { addDays, format } from 'date-fns';

export const transformDailyWeatherData = (
  now: Date,
  items: WeatherInfo[],
  cityDto: CityDto
): DailyWeatherData => {
  const grouped = new Map<string, Partial<HourlyWeather>>();

  // 오늘 날짜 구하기 (YYYYMMDD)
  const todayStr = format(now, 'yyyyMMdd');

  // 최저/최고 기온 임시 저장 변수
  let minTemp: number = 0;
  let maxTemp: number = 0;

  // [Step 1] 데이터 순회 및 파싱
  items.forEach((item) => {
    // 헬퍼 함수를 통해 안전하게 숫자 변환
    const val = parseWeatherValue(item.category, item.fcstValue);

    if (item.fcstDate === todayStr) {
      if (item.category === 'TMN') minTemp = val;
      else if (item.category === 'TMX') maxTemp = val;
    }

    if (item.category !== 'TMN' && item.category !== 'TMX') {
      const key = `${item.fcstDate}${item.fcstTime}`;

      if (!grouped.has(key)) {
        grouped.set(key, {
          dt: parseInt(key),
          date: item.fcstDate,
          time: item.fcstTime,
          sno: 0, // 초기값 0 설정
        });
      }

      const obj = grouped.get(key)!;

      switch (item.category) {
        case 'TMP':
          obj.tmp = val;
          break;
        case 'SKY':
          obj.sky = val;
          break;
        case 'PTY':
          obj.pty = val;
          break;
        case 'POP':
          obj.pop = val;
          break;
        case 'WSD':
          obj.wsd = val;
          break;
        case 'REH':
          obj.reh = val;
          break;
        case 'SNO':
          obj.sno = val;
          break;
      }
    }
  });

  // [Step 2] 시간별 리스트 정렬
  const sortedItems = Array.from(grouped.values()).sort(
    (a, b) => (a.dt || 0) - (b.dt || 0)
  ) as HourlyWeather[];

  // [Step 3] 현재 시각 날씨 구하기
  const currentHour = now.getHours();
  const currentKey = parseInt(
    `${todayStr}${String(currentHour).padStart(2, '0')}00`
  );

  // 정렬된 리스트에서 현재 시간과 일치하는 데이터를 찾음
  // 없으면 가장 가까운 미래 데이터를 사용하고 미래 데이터가 없으면 과거 마지막 데이터 사용
  const currentItem =
    sortedItems.find((item) => item.dt >= currentKey) ||
    sortedItems[sortedItems.length - 1];

  // 현재 날씨 상태(Sky), 강수 형태(Pty), 적설량(Sno) 추출
  const nowTmp = currentItem?.tmp ?? Infinity; // 예외 처리를 위해 Infinity 사용
  const nowSky = currentItem?.sky ?? 1; // 기본값 맑음(1)
  const nowPty = currentItem?.pty ?? 0; // 기본값 없음(0)
  const nowSno = currentItem?.sno ?? 0; // 기본값 적설없음(0)

  const tomorrowStr = format(addDays(now, 1), 'yyyyMMdd');

  let startHour = 5;
  if (currentHour < 5) startHour = currentHour; // 새벽이면 현재부터

  const startTimeLimit = parseInt(
    `${todayStr}${String(startHour).padStart(2, '0')}00`
  );
  const endTimeLimit = parseInt(`${tomorrowStr}0500`);

  const filteredItems = sortedItems.filter((item) => {
    return item.dt >= startTimeLimit && item.dt <= endTimeLimit;
  });

  // [Step 4] 안전장치
  // API에서 아직 오늘의 TMN/TMX가 발표되지 않았거나 누락된 경우,
  // 가지고 있는 '오늘의 시간별 기온(TMP)' 중에서 최솟값/최댓값을 계산해서 채워넣습니다.

  // 오늘 날짜의 아이템만 추출
  const todayItems = sortedItems.filter((item) => item.date === todayStr);

  if (todayItems.length > 0) {
    const todayTemps = todayItems
      .map((item) => item.tmp)
      .filter((t) => t !== undefined);

    // TMN이 없으면 오늘 기온 중 가장 낮은 값 사용
    if (minTemp === null && todayTemps.length > 0) {
      minTemp = Math.min(...todayTemps);
    }

    // TMX가 없으면 오늘 기온 중 가장 높은 값 사용
    if (maxTemp === null && todayTemps.length > 0) {
      maxTemp = Math.max(...todayTemps);
    }
  }

  return {
    items: filteredItems,
    todayMin: minTemp,
    todayMax: maxTemp,
    nowTmp,
    nowSky,
    nowPty,
    nowSno,
    nowDt: currentKey,
    ...cityDto,
  };
};
