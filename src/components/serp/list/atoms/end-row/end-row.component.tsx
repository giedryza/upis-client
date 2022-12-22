import { FC, useEffect, useRef } from 'react';

import { APP } from 'config/app';
import { useIntersectionObserver, useStableHandler } from 'tools/hooks';
import { Loader } from 'ui';

import { Props } from './end-row.types';

export const EndRow: FC<Props> = ({ onInView }) => {
  const ref = useRef<HTMLDivElement>(null);

  const entry = useIntersectionObserver(ref);
  const handler = useStableHandler(onInView);

  useEffect(() => {
    if (entry?.isIntersecting) {
      handler.current();
    }
  }, [entry?.isIntersecting, handler]);

  return <Loader height={APP.serp.cardHeight} ref={ref} />;
};
