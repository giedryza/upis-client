import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from 'tools/hooks';

export const useStableHandler = <Handler extends (...args: any) => any>(
  handler: Handler
) => {
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  return savedHandler;
};
