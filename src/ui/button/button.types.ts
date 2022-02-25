import { LinkProps as NextLinkProps } from 'next/link';

import { IconName } from 'ui';

type ButtonAttributes = JSX.IntrinsicElements['button'];
type LinkAttributes = JSX.IntrinsicElements['a'];

interface BaseProps {
  label?: string;
  icon?: IconName;
  iconPlacement?: 'top' | 'right' | 'bottom' | 'left';
  variant?:
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'ghost-primary'
    | 'ghost-dark'
    | 'text'
    | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  textAlign?: 'left' | 'right' | 'center';
  block?: boolean;
  withDropdown?: boolean;
}

export interface ButtonProps extends BaseProps {
  url?: undefined;
  attributes?: Omit<ButtonAttributes, 'className'>;
}

export interface LinkProps extends BaseProps {
  url: NextLinkProps | string;
  attributes?: Omit<LinkAttributes, 'className' | 'href'>;
}

export type Attributes = ButtonProps['attributes'] & LinkProps['attributes'];

export type Props = ButtonProps | LinkProps;
