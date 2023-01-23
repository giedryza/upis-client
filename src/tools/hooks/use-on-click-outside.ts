import { RefObject } from 'react';

import { useEventListener, useStableHandler } from 'tools/hooks';

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: () => void
) => {
  const handler = useStableHandler(onClickOutside);

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

  useEventListener('mousedown', listener);
  useEventListener('touchstart', listener);
};
