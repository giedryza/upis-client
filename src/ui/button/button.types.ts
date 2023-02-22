import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentProps,
} from 'react';
import Link from 'next/link';

import { IconName } from 'ui';

export const variants = [
  'primary',
  'secondary',
  'tertiary',
  'outline',
  'ghost',
  'text',
  'link',
] as const;

interface BaseProps {
  label?: string;
  icon?: IconName;
  iconPlacement?: 'top' | 'right' | 'bottom' | 'left';
  variant?: (typeof variants)[number];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  width?: 'normal' | 'full';
  textAlign?: 'left' | 'right' | 'center';
  withDropdown?: boolean;
}

type OmittedAttributes = keyof BaseProps | 'className' | 'children';

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, OmittedAttributes> & {
    as: 'button';
  };

type ButtonAsLink = BaseProps &
  Omit<ComponentProps<typeof Link>, OmittedAttributes> & {
    as: 'link';
  };

type ButtonAsExternal = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, OmittedAttributes> & {
    as: 'external';
  };

export type Props = ButtonAsButton | ButtonAsLink | ButtonAsExternal;
