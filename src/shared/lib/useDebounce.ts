import { useState, useEffect } from 'react';

/**
 * @param value 감시할 값
 * @param delay 지연 시간 (ms)
 * @returns 디바운스된 값
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
