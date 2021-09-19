import { VFC } from 'react';
import dynamic from 'next/dynamic';

import { Props, Name } from './icon.types';

const Icon: VFC<Props> = ({ name, ...svgProps }) => {
  const DynamicIcon = dynamic(() => import(`./svgs/${name}.svg`), {
    loading: () => <span className={svgProps.className} />,
  });

  return <DynamicIcon {...svgProps} />;
};

export { Icon, Name as IconName };
