import { useMemo, VFC } from 'react';
import dynamic from 'next/dynamic';

import { Loader } from 'ui';

import { Props } from './icon.types';

export const Icon: VFC<Props> = ({ name, ...svgProps }) => {
  const loader = useMemo(
    () => (
      <span className={svgProps.className}>
        <Loader radius="full" />
      </span>
    ),
    [svgProps.className]
  );

  const DynamicIcon = dynamic(() => import(`./svgs/${name}.svg`), {
    loading: () => loader,
  });

  return <DynamicIcon {...svgProps} />;
};
