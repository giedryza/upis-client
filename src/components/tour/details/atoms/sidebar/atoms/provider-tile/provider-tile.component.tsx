import { FC } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { Image, ImagePlaceholder } from 'ui';
import { routes } from 'config';

import { Props } from './provider-tile.types';
import styles from './provider-tile.module.scss';

export const ProviderTile: FC<Props> = ({
  id,
  name,
  logo,
  toursCount,
  size,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.provider} style={{ '--size': size }}>
      <div className={styles.logo}>
        {logo ? (
          <Image src={logo} sizes={{ width: size, height: size }} alt={name} />
        ) : (
          <ImagePlaceholder radius="full" fit="fluid" />
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.label}>{name}</span>
        <span className={styles.sublabel}>
          <Link
            href={{
              pathname: routes.home,
              query: { providers: [id] },
            }}
          >
            {t('tours:provider.tours_count', { count: toursCount })}
          </Link>
        </span>
      </div>
    </div>
  );
};
