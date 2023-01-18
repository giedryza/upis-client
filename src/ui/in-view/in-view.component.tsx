import { FC, useEffect, useRef } from 'react';

import { useIntersectionObserver, useStableHandler } from 'tools/hooks';

import { Props } from './in-view.types';

export const InView: FC<Props> = ({ onInView, placeholder }) => {
  const ref = useRef<HTMLDivElement>(null);

  const entry = useIntersectionObserver(ref);
  const handler = useStableHandler(onInView);

  useEffect(() => {
    if (entry?.isIntersecting) {
      handler.current();
    }
  }, [entry?.isIntersecting, handler]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div tabIndex={0} ref={ref}>
      {placeholder}
    </div>
  );
};
