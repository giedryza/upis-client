import { FC, ElementType, ReactSVGElement, SVGProps } from 'react';

import { Props, Variant } from './logo.types';
import Horizontal from './assets/horizontal.svg';
import Brandmark from './assets/brandmark.svg';

const LOGO_BY_VARIANT: Record<
  Variant,
  ElementType<SVGProps<ReactSVGElement>>
> = {
  brandmark: Brandmark,
  horizontal: Horizontal,
};

export const Logo: FC<Props> = ({ variant, ...svgProps }) => {
  const Svg = LOGO_BY_VARIANT[variant];

  return <Svg {...svgProps} />;
};
