import { useEffect, useRef } from 'react';

import { useStableHandler } from 'tools/hooks';

export const useTimeout = (
  callback: () => void,
  delay: number | null
): { id: ReturnType<typeof setTimeout> | null } => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handler = useStableHandler(callback);

  useEffect(() => {
    const tick = () => handler.current?.();

    if (delay !== null) {
      const id = setTimeout(tick, delay);
      timeout.current = id;

      return () => {
        clearTimeout(id);
      };
    }
  }, [delay, handler]);

  return {
    id: timeout.current,
  };
};
