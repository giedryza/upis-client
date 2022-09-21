import { useEffect, useRef } from 'react';

export const useInterval = (
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
      const id = window.setInterval(tick, delay);
      timeout.current = id;

      return () => {
        window.clearInterval(id);
      };
    }
  }, [delay]);

  return {
    id: timeout.current,
  };
};
