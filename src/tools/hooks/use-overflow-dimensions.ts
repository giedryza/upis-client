import { RefObject, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useEventListener, useIsomorphicLayoutEffect } from 'tools/hooks';

interface Dimensions {
  containerWidth: number;
  totalWidth: number;
  offsetLeft: number;
  offsetRight: number;
}

export const useOverflowDimensions = <T extends HTMLElement>(
  ref: RefObject<T>
): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    containerWidth: 0,
    totalWidth: 0,
    offsetLeft: 0,
    offsetRight: 0,
  });

  const debouncedSetDimensions = useDebouncedCallback(setDimensions, 100);

  const handleDimensions = useCallback(() => {
    if (!ref.current) return;

    const { offsetWidth, scrollWidth, scrollLeft } = ref.current;

    setTimeout(() => {
      debouncedSetDimensions({
        containerWidth: offsetWidth,
        totalWidth: scrollWidth,
        offsetLeft: scrollLeft,
        offsetRight: scrollWidth - (offsetWidth + scrollLeft),
      });
    }, 1);
  }, [debouncedSetDimensions, ref]);

  useIsomorphicLayoutEffect(() => {
    handleDimensions();
  }, [handleDimensions]);

  useEventListener('resize', handleDimensions);
  useEventListener('scroll', handleDimensions, ref);

  return dimensions;
};
