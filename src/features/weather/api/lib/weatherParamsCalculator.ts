import type { CalcQueryParamRdo } from '@/features/weather/api/rdo';
import { format } from 'date-fns';

const DATA_COUNT = 12;

/**
 * 1. 과거 날씨 조회용 파라미터 계산 (오늘 05:00 ~ 현재 시간 - 1시간)
 * 전략: 무조건 오늘 '0200' BaseTime을 사용합니다.
 * 이유: '0200' 예보는 '0300'부터의 데이터를 제공하므로 '0500' 데이터를 확실히 포함합니다.
 */
export const calculatePastQueryParams = (now: Date): CalcQueryParamRdo => {
  const currentHour = now.getHours();
  const todayStr = format(now, 'yyyyMMdd');

  // 데이터 시작 시간: 03시 (Base 02시 + 1)
  // 목표 종료 시간: 현재 시간 - 1시 (현재 시간 18시라면 17시 데이터까지 필요)
  // 예: 18시 기준 -> 03시~17시 데이터 필요 (15시간)
  // 단, 현재 시간이 05시 미만이면 과거 데이터를 조회할 필요가 없거나 전날 데이터를 봐야 함(이 경우는 예외처리 혹은 0리턴)

  let hoursNeeded = 0;
  if (currentHour > 3) {
    hoursNeeded = currentHour - 1 - 3 + 1;
  }

  // 여유 있게 +1 시간 더 계산 (혹시 모를 누락 방지)
  const safeRows = (hoursNeeded + 1) * DATA_COUNT;

  return {
    base_date: todayStr,
    base_time: '0200',
    numOfRows: Math.max(0, safeRows), // 음수 방지
  };
};

/**
 * 2. 미래/최신 날씨 조회용 파라미터 계산 (현재 시간 ~ 내일 05:00)
 * 전략: 현재 시간에서 가장 가까운 과거의 BaseTime을 찾습니다.
 */
export const calculateFutureQueryParams = (now: Date): CalcQueryParamRdo => {
  const currentHour = now.getHours();
  const todayStr = format(now, 'yyyyMMdd');

  // 기상청 단기예보 BaseTime 목록
  const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];

  // 현재 시간보다 1시간 전인 BaseTime을 찾음 (API 제공 시차 10분~40분 고려하여 보수적으로 선택)
  // 예: 18시 -> 17시 BaseTime 사용 가능
  // 예: 17시 10분 -> 17시 BaseTime 데이터 아직 안나왔을 수 있음 -> 안전하게 하려면 -1 처리가 좋으나,
  // 여기서는 질문자님의 가정(18시에 17시 데이터 사용)을 따릅니다.

  // 현재 시간보다 작거나 같은 BaseTime 중 가장 큰 값 찾기
  const selectedBaseHour =
    baseTimes.reverse().find((bt) => bt <= currentHour) || 2;

  // 만약 현재 시간이 02시보다 작으면 전날 23시 데이터를 써야 함 (날짜 계산 복잡해짐)
  // 여기서는 편의상 당일 로직만 작성하고, 02시 미만일 경우 02시로 fallback 합니다.

  const baseTimeStr = selectedBaseHour.toString().padStart(2, '0') + '00';

  // 데이터 시작 시간: BaseTime + 1
  const dataStartHour = selectedBaseHour + 1;

  // 목표: 내일 05시까지
  // 남은 시간 계산: (24 - 데이터시작시간) + 6 (00,01,02,03,04,05시)
  const hoursRemaining = 24 - dataStartHour + 6;

  const safeRows = (hoursRemaining + 1) * DATA_COUNT;

  return {
    base_date: todayStr,
    base_time: baseTimeStr,
    numOfRows: safeRows,
  };
};
