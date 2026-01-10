export type WeatherApiRto<T> = {
  response: {
    body: {
      dataType: 'JSON' | 'XML';
      items: { item: T[] };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
    header: {
      resultCode: string;
      resultMsg: string;
    };
  };
};
