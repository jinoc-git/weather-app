import { useRef, useEffect, useCallback } from 'react';

export const useUncontrolledInput = (initialValue: string = '') => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.value = initialValue;
    }
  }, [initialValue]);

  const getValue = useCallback(() => {
    return ref.current?.value || '';
  }, []);

  const setValue = useCallback((newValue: string) => {
    if (ref.current) {
      ref.current.value = newValue;
    }
  }, []);

  const focus = useCallback(() => {
    ref.current?.focus();
  }, []);

  return { ref, getValue, setValue, focus };
};
