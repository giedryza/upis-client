import { FC } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { Image, ImagePlaceholder } from 'ui';
import { routes } from 'config';
import { useTours } from 'domain/tours';
import { constructUrl } from 'tools/services/url';

import { Props } from './header.types';
import styles from './header.module.scss';

export const ProviderHeader: FC<Props> = ({ id, name, logo, size }) => {
  const { t } = useTranslation();

  const { data: tours, isLoading } = useTours({
    filters: { limit: 3, providers: [id], populate: ['photos'] },
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
            href={constructUrl({
              pathname: routes.home,
              query: { providers: [id] },
            })}
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
