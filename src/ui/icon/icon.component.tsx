import { FC } from 'react';
import dynamic from 'next/dynamic';

import { IconName } from './icon.types';

interface Props extends React.SVGAttributes<SVGElement> {
  name: IconName;
}

const Icon: FC<Props> = ({ name, ...svgProps }) => {
  const DynamicIcon = dynamic(() => import(`./svgs/${name}.svg`), {
    loading: () => <span className={svgProps.className} />,
  });

  return <DynamicIcon {...svgProps} />;
};

export { Icon, IconName };
