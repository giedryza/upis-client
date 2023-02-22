import { FC, useMemo } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

import { Icon } from 'ui';
import { toExternalLink } from 'tools/common';

import { Props } from './button.types';
import styles from './button.module.scss';

export const Button: FC<Props> = ({
  label,
  icon,
  iconPlacement = 'left',
  variant = 'primary',
  size = 'md',
  width = 'normal',
  textAlign = 'center',
  withDropdown,
  ...rest
}) => {
  const content = useMemo(
    () => (
      <>
        {icon && ['left', 'top'].includes(iconPlacement) ? (
          <Icon
            name={icon}
            className={styles.icon}
            focusable={false}
            aria-hidden
          />
        ) : null}

        {label ? <span>{label}</span> : null}

        {icon && ['right', 'bottom'].includes(iconPlacement) ? (
          <Icon
            name={icon}
            className={styles.icon}
            focusable={false}
            aria-hidden
          />
        ) : null}

        {withDropdown ? (
          <span className={styles.arrow} aria-hidden>
            &#x25BC;
          </span>
        ) : null}
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
    styles[`width-${width}`],
    icon && !label && styles.iconButton
  );

  if (rest.as === 'button') {
    const { as, ...attributes } = rest;

    return (
      <button className={className} type="button" {...attributes}>
        {content}
      </button>
    );
  }

  if (rest.as === 'link') {
    const { as, ...attributes } = rest;

    return (
      <Link className={className} {...attributes}>
        {content}
      </Link>
    );
  }

  if (rest.as === 'external') {
    const { as, href = '', ...attributes } = rest;

    return (
      <a
        className={className}
        href={toExternalLink(href)}
        target="_blank"
        rel="noreferrer"
        {...attributes}
      >
        {content}
      </a>
    );
  }

  return null;
};
