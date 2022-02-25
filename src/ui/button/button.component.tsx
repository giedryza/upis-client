import { VFC, useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { Icon } from 'ui';

import styles from './button.module.scss';
import { Props, LinkProps, ButtonProps } from './button.types';

export const Button: VFC<Props> = ({
  label,
  url,
  block,
  icon,
  iconPlacement = 'left',
  variant = 'primary',
  size = 'md',
  textAlign = 'center',
  withDropdown,
  attributes = {},
}) => {
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

        {withDropdown && (
          <span className={styles.arrow} aria-hidden>
            &#x25BC;
          </span>
        )}
      </>
    ),
    [label, icon, iconPlacement, withDropdown]
  );

  const className = clsx(
    styles.button,
    styles.ripple,
    styles[variant],
    styles[size],
    styles[`icon-${iconPlacement}`],
    styles[`text-${textAlign}`],
    {
      [styles.iconButton as string]: icon && !label,
      [styles.block as string]: block,
    }
  );

  return url ? (
    <Link {...(typeof url === 'string' ? { href: url } : url)}>
      <a className={className} {...(attributes as LinkProps['attributes'])}>
        {content}
      </a>
    </Link>
  ) : (
    <button
      className={className}
      {...{
        type: 'button',
        ...(attributes as ButtonProps['attributes']),
      }}
    >
      {content}
    </button>
  );
};

export * from './button.types';
