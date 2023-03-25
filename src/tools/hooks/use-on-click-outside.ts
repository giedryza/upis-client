import { RefObject } from 'react';

import { useEventListener, useStable } from 'tools/hooks';

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: () => void
) => {
  const handler = useStable(onClickOutside);

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
