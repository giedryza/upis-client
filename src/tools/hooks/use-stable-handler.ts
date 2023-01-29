import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from 'tools/hooks';
import { AnyFunction } from 'types/common';

export const useStableHandler = <Handler extends AnyFunction>(
  handler: Handler
) => {
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  return savedHandler;
};
