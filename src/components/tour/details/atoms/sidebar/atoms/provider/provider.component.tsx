import { FC } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { Image, ImagePlaceholder } from 'ui';
import { routes } from 'config';
import { useTours } from 'domain/tours';

import { Props } from './provider.types';
import styles from './provider.module.scss';

export const SidebarProvider: FC<Props> = ({ id, name, logo, size }) => {
  const { t } = useTranslation();

  const { data: tours, isLoading } = useTours({
    filters: { limit: 3, providers: [id] },
  });

  return (
    <div className={styles.provider} style={{ '--size': size }}>
      <div className={styles.logo}>
        {logo ? (
          <Image
            src={logo}
            sizes={{ width: size, height: size }}
            alt={name}
            style={{ objectFit: 'cover' }}
          />
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
            {isLoading
              ? t('tours:provider.tours')
              : t('tours:provider.tours_count', {
                  count: tours?.meta?.total ?? 0,
                })}
          </Link>
        </span>
      </div>
    </div>
  );
};
