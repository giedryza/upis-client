import { useEffect, useRef } from 'react';

import { useStableHandler } from 'tools/hooks';

export const useInterval = (
  callback: () => void,
  delay: number | null
): { id: ReturnType<typeof setInterval> | null } => {
  const timeout = useRef<ReturnType<typeof setInterval> | null>(null);
  const handler = useStableHandler(callback);

  useEffect(() => {
    const tick = () => handler.current?.();

    if (delay !== null) {
      const id = setInterval(tick, delay);
      timeout.current = id;

      return () => {
        clearInterval(id);
      };
    }
  }, [delay, handler]);

  return {
    id: timeout.current,
  };
};
