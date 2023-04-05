import { FC, useEffect, useRef } from 'react';

import { useIntersectionObserver, useStable } from 'tools/hooks';

import { Props } from './in-view.types';

const PLACEHOLDER = <div style={{ width: 1, height: 1 }} />;

export const InView: FC<Props> = ({
  onInView,
  placeholder = PLACEHOLDER,
  focusable = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const entry = useIntersectionObserver(ref);
  const handler = useStable(onInView);

  useEffect(() => {
    handler.current(entry?.isIntersecting ?? false);
  }, [entry?.isIntersecting, handler]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div tabIndex={focusable ? 0 : -1} ref={ref}>
      {placeholder}
    </div>
  );
};
