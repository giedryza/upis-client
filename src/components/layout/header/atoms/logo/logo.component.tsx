import { FC } from 'react';
import Link from 'next/link';

import { routes } from 'config';
import { generateUrl } from 'tools/common';
import { Logo } from 'ui';

import styles from './logo.module.scss';

export const HeaderLogo: FC = () => {
  return (
    <Link
      href={generateUrl(routes.home)}
      className={styles.logo}
      aria-label="Home"
    >
      <Logo variant="horizontal" focusable={false} aria-hidden />
    </Link>
  );
};
