import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    serviceKey: import.meta.env.VITE_OPENWEATHER_API_KEY_DECODEING,
    dataType: 'JSON',
  },
});

weatherApi.interceptors.response.use(
  (response) => {
    // header의 결과 코드 등으로 에러 처리가 필요할 수 있음
    const { body } = response?.data?.response || {};

    return body || {};
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getWeatherApi = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return weatherApi.get<AxiosResponse<T>, T>(url, config);
};
