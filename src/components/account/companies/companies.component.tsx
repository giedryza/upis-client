import useTranslation from 'next-translate/useTranslation';
import { VFC } from 'react';

import { Card, EmptyState } from 'ui';
import { routes } from 'config/routes';
import { useMyCompanies } from 'domain/companies';

import { CompaniesActions, CompaniesTable } from './atoms';
import styles from './companies.module.scss';

export const Companies: VFC = () => {
  const { t } = useTranslation();

  const { data: companies = [], isLoading } = useMyCompanies();

  return (
    <Card>
      {!companies.length && !isLoading ? (
        <EmptyState
          title={t('account:companies.empty.title')}
          message={t('account:companies.empty.message')}
          icon="kayak"
          action={{
            label: t('account:companies.actions.add'),
            icon: 'plus',
            url: routes.account.companies.create,
          }}
        />
      ) : (
        <div className={styles.content}>
          <CompaniesActions />
          <CompaniesTable />
        </div>
      )}
    </Card>
  );
};
