import axios from 'axios';

export const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    serviceKey: import.meta.env.VITE_OPENWEATHER_API_KEY_DECODEING,
    dataType: 'JSON',
  },
});
