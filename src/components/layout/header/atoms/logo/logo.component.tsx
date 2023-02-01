import { FC } from 'react';
import Link from 'next/link';

import { routes } from 'config/routes';
import { generateUrl } from 'tools/common';
import LogoSvg from 'components/logo/logo-horizontal.svg';

import styles from './logo.module.scss';

export const Logo: FC = () => {
  return (
    <Link
      href={generateUrl(routes.home)}
      className={styles.logo}
      aria-label="Home"
    >
      <LogoSvg focusable={false} aria-hidden />
    </Link>
  );
};
