/* eslint-disable react/button-has-type */
import { VFC, useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import styles from './button.module.scss';
import { Props, LinkProps, ButtonProps } from './button.types';

import { Icon } from 'ui/icon/icon.component';

export const Button: VFC<Props> = ({
  // id,
  label,
  // title,
  // onClick,
  url,
  // target,
  // type = 'button',
  // form,
  block,
  icon,
  iconPlacement = 'left',
  styleType = 'primary',
  size = 'md',
  textAlign = 'center',
  // disabled,
  withDropdown,
  // role,
  // ariaLabel,
  // ariaHasPopup,
  // ariaExpanded,
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

        {withDropdown && <span className={styles.arrow}>&#x25BC;</span>}
      </>
    ),
    [label, icon, iconPlacement, withDropdown]
  );

  const className = clsx(
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
  );

  // const attributes2: HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> = {
  //   className: clsx(
  //     styles.button,
  //     styles.ripple,
  //     styles[styleType],
  //     styles[size],
  //     styles[`icon-${iconPlacement}`],
  //     styles[`text-${textAlign}`],
  //     {
  //       [styles.iconButton as string]: icon && !label,
  //       [styles.block as string]: block,
  //     }
  //   ),
  //   onClick,
  //   id,
  //   title,
  //   role,
  //   'aria-label': ariaLabel,
  //   'aria-haspopup': ariaHasPopup,
  //   'aria-expanded': ariaExpanded,
  // };

  return url ? (
    <Link href={url}>
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
