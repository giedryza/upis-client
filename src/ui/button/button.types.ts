import { AriaAttributes } from 'react';
import { LinkProps } from 'next/link';

import { IconName } from 'ui/icon/icon.component';

export interface Props {
  id?: string;
  label?: string;
  title?: string;
  onClick?: () => void;
  url?: string | LinkProps;
  type?: JSX.IntrinsicElements['button']['type'];
  form?: JSX.IntrinsicElements['button']['form'];
  target?: '_self' | '_blank' | '_parent' | '_top';
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
  disabled?: boolean;
  withDropdown?: boolean;
  ariaLabel?: AriaAttributes['aria-label'];
  ariaHasPopup?: AriaAttributes['aria-haspopup'];
  ariaExpanded?: AriaAttributes['aria-expanded'];
  role?: string;
}
