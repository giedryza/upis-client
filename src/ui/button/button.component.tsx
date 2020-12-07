/* eslint-disable react/button-has-type */
import { FC, useMemo } from 'react';
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
  block?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  styleType?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Button: FC<Props> = ({
  label,
  ariaLabel,
  title,
  url,
  target,
  type = 'button',
  block,
  iconLeft,
  iconRight,
  styleType = 'primary',
  size = 'md',
}) => {
  const content = useMemo(
    () => (
      <>
        {iconLeft && (
          <Icon
            name={iconLeft}
            className={styles.icon}
            focusable={false}
            aria-hidden
          />
        )}

        {label && <span>{label}</span>}

        {iconRight && (
          <Icon
            name={iconRight}
            className={styles.icon}
            focusable={false}
            aria-hidden
          />
        )}
      </>
    ),
    [label, iconLeft, iconRight]
  );

  const attributes = {
    className: classnames(
      styles.button,
      styles.ripple,
      styles[styleType],
      styles[size],
      {
        [styles.iconButton]: (iconLeft || iconRight) && !label,
        [styles.block]: block,
      }
    ),
    title,
    'aria-label': ariaLabel,
  };

  return target ? (
    <a {...attributes} href={url} target={target} rel="noopener noreferrer">
      {content}
    </a>
  ) : url ? (
    <Link href={url}>
      <a {...attributes}>{content}</a>
    </Link>
  ) : (
    <button {...attributes} type={type}>
      {content}
    </button>
  );
};

export { Button };
