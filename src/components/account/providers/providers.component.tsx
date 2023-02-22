import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { Card, EmptyState } from 'ui';
import { routes } from 'config';
import { generateUrl } from 'tools/common';
import { useMyProviders } from 'domain/providers';

import { ProvidersFooter, ProvidersHeader, ProvidersList } from './atoms';
import styles from './providers.module.scss';

export const Providers: FC = () => {
  const { t } = useTranslation();

  const { data: providers, isLoading } = useMyProviders();

  return (
    <Card>
      {!providers?.items.length && !isLoading ? (
        <EmptyState
          title={t('account:providers.empty.title')}
          message={t('account:providers.empty.message')}
          icon="kayak"
          action={{
            as: 'link',
            label: t('account:providers.actions.add'),
            icon: 'plus',
            href: generateUrl(routes.account.providers.create),
          }}
        />
      ) : (
        <div className={styles.content}>
          <ProvidersHeader />
          <ProvidersList />
          <ProvidersFooter />
        </div>
      )}
    </Card>
  );
};
