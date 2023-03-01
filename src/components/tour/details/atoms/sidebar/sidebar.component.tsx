import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, Loader } from 'ui';
import { useActiveTour } from 'domain/tours';

import { SidebarProvider, SidebarContacts, SidebarSocials } from './atoms';
import styles from './sidebar.module.scss';

const PROVIDER_TILE_SIZE = 40;

export const DetailsSidebar: FC = () => {
  const { t } = useTranslation();

  const { data: tour, isLoading } = useActiveTour();

  return (
    <aside className={styles.container}>
      {isLoading ? (
        <Loader height={PROVIDER_TILE_SIZE} />
      ) : tour ? (
        <>
          <SidebarProvider
            id={tour.provider._id}
            name={tour.provider.name}
            logo={tour.provider.logo.location}
            size={PROVIDER_TILE_SIZE}
          />

          <SidebarContacts
            phone={tour.provider.phone}
            email={tour.provider.email}
            languages={tour.provider.languages}
          />

          <SidebarSocials socials={tour.provider.socials} />

          {tour.provider.website ? (
            <Button
              as="external"
              href={tour.provider.website}
              label={t('tours:actions.visit_website')}
              variant="primary"
              size="sm"
              width="full"
            />
          ) : null}
        </>
      ) : null}
    </aside>
  );
};
