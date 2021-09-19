/* eslint-disable react/button-has-type */
import { VFC, HTMLAttributes, useMemo } from 'react';
import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';

import styles from './button.module.scss';
import { Props } from './button.types';

import { Icon } from 'ui/icon/icon.component';

const Button: VFC<Props> = ({
  id,
  label,
  title,
  onClick,
  url,
  target,
  type = 'button',
  form,
  block,
  icon,
  iconPlacement = 'left',
  styleType = 'primary',
  size = 'md',
  textAlign = 'center',
  disabled,
  withDropdown,
  role,
  ariaLabel,
  ariaHasPopup,
  ariaExpanded,
}) => {
  const parsedUrl =
    url && typeof url === 'string'
      ? `${url.startsWith('http') || url.startsWith('/') ? '' : '//'}${url}`
      : '';

  const getLinkProps = (link: string | LinkProps) =>
    typeof link === 'string' ? { href: link } : link;

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

        {withDropdown && <span className={styles.arrow}>&#x25BC;</span>}
      </>
    ),
    [label, icon, iconPlacement, withDropdown]
  );

  const attributes: HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> = {
    className: clsx(
      styles.button,
      styles.ripple,
      styles[styleType],
      styles[size],
      styles[`icon-${iconPlacement}`],
      styles[`text-${textAlign}`],
      {
        [styles.iconButton as string]: icon && !label,
        [styles.block as string]: block,
      }
    ),
    onClick,
    id,
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
    <Link {...getLinkProps(url)}>
      <a {...attributes}>{content}</a>
    </Link>
  ) : (
    <button {...attributes} type={type} disabled={disabled} form={form}>
      {content}
    </button>
  );
};

export { Button };
export type { Props as ButtonProps };
