import { LinkProps as NextLinkProps } from 'next/link';

import { IconName } from 'ui/icon/icon.component';

export type ButtonAttributes = JSX.IntrinsicElements['button'];
export type LinkAttributes = JSX.IntrinsicElements['a'];

export interface BaseProps {
  // id?: string;
  label?: string;
  // title?: string;
  // onClick?: () => void;
  // type?: JSX.IntrinsicElements['button']['type'];
  // form?: JSX.IntrinsicElements['button']['form'];
  // target?: '_self' | '_blank' | '_parent' | '_top';
  icon?: IconName;
  iconPlacement?: 'top' | 'right' | 'bottom' | 'left';
  styleType?:
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
  // disabled?: boolean;
  withDropdown?: boolean;
  // ariaLabel?: AriaAttributes['aria-label'];
  // ariaHasPopup?: AriaAttributes['aria-haspopup'];
  // ariaExpanded?: AriaAttributes['aria-expanded'];
  // role?: string;
}

export interface ButtonProps extends BaseProps {
  url?: undefined;
  attributes?: Omit<ButtonAttributes, 'className'>;
}

export interface LinkProps extends BaseProps {
  url: NextLinkProps['href'];
  attributes?: Omit<LinkAttributes, 'className' | 'href'> &
    Omit<NextLinkProps, 'href'>;
}

export type Props = ButtonProps | LinkProps;
