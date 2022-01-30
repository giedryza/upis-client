import { useMemo, VFC } from 'react';
import dynamic from 'next/dynamic';

import { Props, Name } from './icon.types';

const Icon: VFC<Props> = ({ name, ...svgProps }) => {
  const loader = useMemo(
    () => <span className={svgProps.className} />,
    [svgProps.className]
  );

  const DynamicIcon = dynamic(() => import(`./svgs/${name}.svg`), {
    loading: () => loader,
  });

  return <DynamicIcon {...svgProps} />;
};

export { Icon, Name as IconName };
