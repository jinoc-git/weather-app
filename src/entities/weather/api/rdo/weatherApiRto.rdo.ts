export type WeatherApiRto<T> = {
  dataType: 'JSON' | 'XML';
  items: { item: T[] };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
};
