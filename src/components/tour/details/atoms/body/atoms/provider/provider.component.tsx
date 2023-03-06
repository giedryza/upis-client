import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, Loader } from 'ui';
import { useActiveTour } from 'domain/tours';

import { ProviderHeader, ProviderContacts, ProviderSocials } from './atoms';
import { Props } from './provider.types';
import styles from './provider.module.scss';

const PROVIDER_TILE_SIZE = 40;

export const Provider: FC<Props> = ({ placement }) => {
  const { t } = useTranslation();

  const { data: tour, isLoading } = useActiveTour();

  return (
    <div className={styles.content}>
      {isLoading ? (
        <Loader height={PROVIDER_TILE_SIZE} />
      ) : tour ? (
        <>
          <ProviderHeader
            id={tour.provider._id}
            name={tour.provider.name}
            logo={tour.provider.logo.location}
            size={PROVIDER_TILE_SIZE}
          />

          <ProviderContacts
            phone={tour.provider.phone}
            email={tour.provider.email}
            languages={tour.provider.languages}
          />

          <ProviderSocials socials={tour.provider.socials} />

          {tour.provider.website ? (
            <Button
              as="external"
              href={tour.provider.website}
              label={t('tours:actions.visit_website')}
              variant="primary"
              size="sm"
              width={placement === 'section' ? 'normal' : 'full'}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};
