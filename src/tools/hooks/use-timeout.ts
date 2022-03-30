import { useEffect, useRef } from 'react';

export const useTimeout = (
  callback: () => void,
  delay: number | null
): { id: number | null } => {
  const timeout = useRef<number | null>(null);
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current?.();

    if (delay !== null) {
      const id = window.setTimeout(tick, delay);
      timeout.current = id;

      return () => {
        window.clearTimeout(id);
      };
    }
  }, [delay]);

  return {
    id: timeout.current,
  };
};
