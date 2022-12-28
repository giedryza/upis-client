import { useMemo, FC } from 'react';
import dynamic from 'next/dynamic';

import { Props } from './icon.types';

export const Icon: FC<Props> = ({ name, ...svgProps }) => {
  const loader = useMemo(
    () => <span className={svgProps.className} />,
    [svgProps.className]
  );

  const DynamicIcon = dynamic(() => import(`./svgs/${name}.svg`), {
    loading: () => loader,
  });

  return <DynamicIcon {...svgProps} />;
};
