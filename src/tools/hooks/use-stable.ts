import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from 'tools/hooks';

export const useStable = <Identity extends any>(identity: Identity) => {
  const savedHandler = useRef(identity);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = identity;
  }, [identity]);

  return savedHandler;
};
