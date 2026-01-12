export const parseWeatherValue = (category: string, value: string): number => {
  // 눈(SNO)이나 비(PCP)의 경우 텍스트로 올 때가 있음
  if (category === 'SNO' || category === 'PCP') {
    if (value === '적설없음' || value === '강수없음') return 0;
    if (value.includes('미만')) return 0.5; // "1.0mm 미만" 등은 0.5 등으로 처리

    // 단위(cm, mm)가 붙어있을 수 있으므로 숫자만 추출
    return parseFloat(value) || 0;
  }

  // 나머지는 일반 실수 변환
  return parseFloat(value);
};
