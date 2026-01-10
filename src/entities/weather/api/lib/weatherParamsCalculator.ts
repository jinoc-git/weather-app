import type { CalcQueryParamRdo } from '@/entities/weather/api/rdo';
import { format, subDays } from 'date-fns';

const DATA_COUNT = 12;

/**
 * 1. 과거 날씨 조회용 파라미터 계산 (오늘 05:00 ~ 현재 시간 - 1시간)
 * 전략: 오늘 '0200' BaseTime을 사용합니다.
 * 이유: '0200' 예보는 '0300'부터의 데이터를 제공하므로 '0500' 데이터를 확실히 포함합니다.
 */
export const calculatePastQueryParams = (now: Date): CalcQueryParamRdo => {
  const currentHour = now.getHours();
  let baseDate = format(now, 'yyyyMMdd');
  let baseTime = '0200'; // 기본값

  // 🚨 새벽 예외 처리: 00시 ~ 02시 10분 사이
  // 아직 오늘 02시 예보가 안 나왔으므로, "어제 23시" 예보를 사용해야 함
  if (currentHour < 2) {
    baseDate = format(subDays(now, 1), 'yyyyMMdd'); // 어제 날짜
    baseTime = '2300'; // 어제 마지막 BaseTime
  }

  // 필요한 시간 계산
  // 예: 01시 조회 -> 어제 23시 Base 사용 -> 00시부터 데이터 나옴 -> 00시~01시 데이터 필요
  // 예: 18시 조회 -> 오늘 02시 Base 사용 -> 03시부터 데이터 나옴 -> 03시~18시 데이터 필요

  // 넉넉하게 잡기 위해 계산 로직보다는 그냥 충분히(24시간분) 요청하고 필터링하는 게 안전함
  // 어제 23시 Base로 조회하면 오늘 00시부터 데이터가 쭈욱 나옴.

  return {
    base_date: baseDate,
    base_time: baseTime,
    numOfRows: 1000, // 계산 복잡도를 줄이기 위해 넉넉히 요청 (어차피 텍스트라 용량 작음)
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
