/* eslint-disable react/button-has-type */
import { FC, AllHTMLAttributes, useMemo, AriaAttributes } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import styles from './button.module.scss';

import { Icon, IconName } from 'ui/icon/icon.component';

export interface Props {
  label?: string;
  title?: string;
  onClick?: () => void;
  url?: string;
  type?: JSX.IntrinsicElements['button']['type'];
  target?: '_self' | '_blank' | '_parent' | '_top';
  icon?: IconName;
  iconPlacement?: 'top' | 'right' | 'bottom' | 'left';
  styleType?: 'primary' | 'secondary' | 'ghost' | 'text' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  textAlign?: 'left' | 'right' | 'center';
  block?: boolean;
  disabled?: boolean;
  ariaLabel?: AriaAttributes['aria-label'];
  ariaHasPopup?: AriaAttributes['aria-haspopup'];
  ariaExpanded?: AriaAttributes['aria-expanded'];
  role?: string;
}

const Button: FC<Props> = ({
  label,
  title,
  onClick,
  url,
  target,
  type = 'button',
  block,
  icon,
  iconPlacement = 'left',
  styleType = 'primary',
  size = 'md',
  textAlign = 'center',
  disabled,
  role,
  ariaLabel,
  ariaHasPopup,
  ariaExpanded,
}) => {
  const parsedUrl = url
    ? `${url.startsWith('http') || url.startsWith('/') ? '' : '//'}${url}`
    : '';

  const content = useMemo(
    () => (
      <>
        {icon && ['left', 'top'].includes(iconPlacement) && (
          <Icon
            name={icon}
            className={styles.icon}
            focusable={false}
            aria-hidden
          />
        )}

        {label && <span>{label}</span>}

        {icon && ['right', 'bottom'].includes(iconPlacement) && (
          <Icon
            name={icon}
            className={styles.icon}
            focusable={false}
            aria-hidden
          />
        )}
      </>
    ),
    [label, icon, iconPlacement]
  );

  const attributes: AllHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> = {
    className: classnames(
      styles.button,
      styles.ripple,
      styles[styleType],
      styles[size],
      styles[`icon-${iconPlacement}`],
      styles[`text-${textAlign}`],
      {
        [styles.iconButton]: icon && !label,
        [styles.block]: block,
      }
    ),
    title,
    role,
    'aria-label': ariaLabel,
    'aria-haspopup': ariaHasPopup,
    'aria-expanded': ariaExpanded,
  };

  return target ? (
    <a
      {...attributes}
      href={parsedUrl}
      target={target}
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : url ? (
    <Link href={parsedUrl}>
      <a {...attributes}>{content}</a>
    </Link>
  ) : (
    <button {...attributes} type={type} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
};

export { Button };
