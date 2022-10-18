import useTranslation from 'next-translate/useTranslation';
import { VFC } from 'react';

import { Card, EmptyState } from 'ui';
import { routes } from 'config/routes';
import { useMyProviders } from 'domain/providers';

import { ProvidersActions, ProvidersList } from './atoms';
import styles from './providers.module.scss';

export const Providers: VFC = () => {
  const { t } = useTranslation();

  const { data: providers = [], isLoading } = useMyProviders();

  return (
    <Card>
      {!providers.length && !isLoading ? (
        <EmptyState
          title={t('account:providers.empty.title')}
          message={t('account:providers.empty.message')}
          icon="kayak"
          action={{
            label: t('account:providers.actions.add'),
            icon: 'plus',
            url: routes.account.providers.create,
          }}
        />
      ) : (
        <div className={styles.content}>
          <ProvidersActions />
          <ProvidersList />
        </div>
      )}
    </Card>
  );
};