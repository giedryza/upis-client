import { RefObject, useEffect, useState } from 'react';

interface Options extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = <E extends Element>(
  elementRef: RefObject<E>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Options = {}
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([observerEntry]: IntersectionObserverEntry[]): void => {
    setEntry(observerEntry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const isSupported = !!window.IntersectionObserver;

    if (!isSupported || frozen || !node) return;

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
};
