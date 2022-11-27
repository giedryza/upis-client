import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Card, EmptyState } from 'ui';
import { routes } from 'config/routes';
import { useMyProviders } from 'domain/providers';
import { useMyTours } from 'domain/tours';

import { ToursActions, ToursList } from './atoms';
import styles from './tours.module.scss';

export const Tours: FC = () => {
  const { t } = useTranslation();

  const { data: providers = [], isLoading: isProvidersLoading } =
    useMyProviders();
  const { data: tours = [], isLoading: isToursLoading } = useMyTours();

  return (
    <Card>
      {!providers.length && !isProvidersLoading ? (
        <EmptyState
          title={t('account:tours.empty.title')}
          message={t('account:tours.empty.messageProviders')}
          icon="path"
          action={{
            label: t('account:providers.actions.add'),
            icon: 'plus',
            url: routes.account.providers.create,
          }}
        />
      ) : !tours.length && !isToursLoading ? (
        <EmptyState
          title={t('account:tours.empty.title')}
          message={t('account:tours.empty.messageTours')}
          icon="path"
          action={{
            label: t('account:tours.actions.add'),
            icon: 'plus',
            url: routes.account.tours.create,
          }}
        />
      ) : (
        <div className={styles.content}>
          <ToursActions />
          <ToursList />
        </div>
      )}
    </Card>
  );
};
