import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Card, EmptyState } from 'ui';
import { routes } from 'config/routes';
import { useMyCompanies } from 'domain/companies';

import { ToursActions, ToursTable } from './atoms';
import styles from './tours.module.scss';

export const Tours: VFC = () => {
  const { t } = useTranslation();

  const { data: companies = [], isLoading: isCompaniesLoading } =
    useMyCompanies();

  return (
    <Card>
      {!companies.length && !isCompaniesLoading ? (
        <EmptyState
          title={t('account:tours.empty.title')}
          message={t('account:tours.empty.message')}
          icon="path"
          action={{
            label: t('account:companies.actions.add'),
            icon: 'plus',
            url: routes.account.companies.create,
          }}
        />
      ) : (
        <div className={styles.content}>
          <ToursActions />
          <ToursTable />
        </div>
      )}
    </Card>
  );
};
