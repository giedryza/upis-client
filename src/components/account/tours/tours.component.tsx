import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Card, EmptyState } from 'ui';
import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { useMyProviders } from 'domain/providers';
import { useMyTours } from 'domain/tours';

import { ToursHeader, ToursFooter, ToursList } from './atoms';
import styles from './tours.module.scss';

export const Tours: FC = () => {
  const { t } = useTranslation();

  const { data: providers, isLoading: isProvidersLoading } = useMyProviders({
    page: 1,
  });
  const { data: tours, isLoading: isToursLoading } = useMyTours();

  return (
    <Card>
      {!providers?.items.length && !isProvidersLoading ? (
        <EmptyState
          title={t('account:tours.empty.title')}
          message={t('account:tours.empty.message_providers')}
          icon="path"
          action={{
            as: 'link',
            label: t('account:providers.actions.add'),
            icon: 'plus',
            href: generateUrl(routes.account.providers.create),
          }}
        />
      ) : !tours?.items.length && !isToursLoading ? (
        <EmptyState
          title={t('account:tours.empty.title')}
          message={t('account:tours.empty.message_tours')}
          icon="path"
          action={{
            as: 'link',
            label: t('account:tours.actions.add'),
            icon: 'plus',
            href: generateUrl(routes.account.tours.create),
          }}
        />
      ) : (
        <div className={styles.content}>
          <ToursHeader />
          <ToursList />
          <ToursFooter />
        </div>
      )}
    </Card>
  );
};
