import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Card, EmptyState } from 'ui';
import { routes } from 'config/routes';
import { useMyCompanies } from 'domain/companies';
import { useMyTours } from 'domain/tours';

import { ToursActions, ToursList } from './atoms';
import styles from './tours.module.scss';

export const Tours: VFC = () => {
  const { t } = useTranslation();

  const { data: companies = [], isLoading: isCompaniesLoading } =
    useMyCompanies();
  const { data: tours = [], isLoading: isToursLoading } = useMyTours();

  return (
    <Card>
      {!companies.length && !isCompaniesLoading ? (
        <EmptyState
          title={t('account:tours.empty.title')}
          message={t('account:tours.empty.messageCompanies')}
          icon="path"
          action={{
            label: t('account:companies.actions.add'),
            icon: 'plus',
            url: routes.account.companies.create,
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
