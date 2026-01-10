export type DistrictCoordinate = {
  nx: number;
  ny: number;
};

export type WeatherCategory =
  | 'POP' // 강수 확률 %
  | 'PTY' // 강수 형태 (0-없음, 1-비, 2-비/눈, 3-눈, 4-소나기)
  | 'PCP' // 1시간 수량 mm ('1mm 미만', 1.0-29.9, 30.0-50.0, '50.0mm 이상')
  | 'REH' // 습도 %
  | 'SNO' // 1시간 신적설 1cm (1-보통 눈, 2-많은 눈, '적설 없음')
  | 'SKY' // 하늘 상태 (1-맑음, 3-구름 많음, 4-흐림)
  | 'TMP' // 1시간 기온 °C
  | 'TMN' // 일 최저 기온 °C
  | 'TMX' // 일 최고 기온 °C
  | 'UUU' // 풍속(동서) m/s
  | 'VVV' // 풍속(남북) m/s
  | 'WAV'; // 파고 M

export type WeatherInfo = {
  baseDate: string;
  baseTime: string;
  category: WeatherCategory;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
} & DistrictCoordinate;
