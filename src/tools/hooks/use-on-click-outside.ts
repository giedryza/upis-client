import { useEffect, RefObject } from 'react';

import { useStableHandler } from 'tools/hooks';

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: () => void
) => {
  const handler = useStableHandler(onClickOutside);

  useEffect(() => {
    const listener = <E extends Event>(e: E) => {
      if (
        !(e.target instanceof Node) ||
        !ref.current ||
        ref.current.contains(e.target)
      ) {
        return;
      }

      handler.current();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
