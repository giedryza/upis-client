/* eslint-disable react/button-has-type */
import { FC, AllHTMLAttributes, useMemo } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import styles from './button.module.scss';

import { Icon, IconName } from 'ui/icon/icon.component';

interface Props {
  label?: string;
  ariaLabel?: string;
  title?: string;
  url?: string;
  type?: JSX.IntrinsicElements['button']['type'];
  target?: '_self' | '_blank' | '_parent' | '_top';
  icon?: IconName;
  iconPlacement?: 'top' | 'right' | 'bottom' | 'left';
  styleType?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  block?: boolean;
  disabled?: boolean;
}

const Button: FC<Props> = ({
  label,
  ariaLabel,
  title,
  url,
  target,
  type = 'button',
  block,
  icon,
  iconPlacement = 'left',
  styleType = 'primary',
  size = 'md',
  disabled,
}) => {
  const parsedUrl = `${url.startsWith('http') ? '' : '//'}${url}`;

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
      {
        [styles.iconButton]: icon && !label,
        [styles.block]: block,
      }
    ),
    title,
    'aria-label': ariaLabel,
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
    <button {...attributes} type={type} disabled={disabled}>
      {content}
    </button>
  );
};

export { Button };
