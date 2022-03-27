import { useMemo, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button, Table, TableProps } from 'ui';
import { useMyCompanies } from 'domain/companies/companies.queries';
import { useDeleteCompany } from 'domain/companies/companies.mutations';

import { CompaniesTableColumns } from './companies-table.types';
import styles from './companies-table.module.scss';

export const CompaniesTable: VFC = () => {
  const { t } = useTranslation();

  const { data: companies = [] } = useMyCompanies();
  const { mutate: deleteCompany, isLoading: isDeleteCompanyLoading } =
    useDeleteCompany();

  const columns = useMemo<TableProps<CompaniesTableColumns>['columns']>(() => {
    return [
      { accessor: 'name', label: t('account:companies.table.name') },
      { accessor: 'email', label: t('account:companies.table.email') },
      { accessor: 'phone', label: t('account:companies.table.phone') },
      { accessor: 'website', label: t('account:companies.table.website') },
      { accessor: 'actions', label: '', align: 'right' },
    ];
  }, [t]);

  const rows = useMemo<TableProps<CompaniesTableColumns>['rows']>(() => {
    return companies.map((company) => ({
      id: company._id,
      content: {
        name: (
          <Button
            label={company.name}
            variant="link"
            size="sm"
            textAlign="left"
            url={routes.account.companies.one.index.replace(
              ':slug',
              company.slug
            )}
          />
        ),
        email: company.email,
        phone: company.phone,
        website: company.website,
        actions: (
          <div className={styles.actions}>
            <Button
              icon="trash"
              size="xs"
              variant="secondary"
              attributes={{
                title: t('common:actions.delete'),
                disabled: isDeleteCompanyLoading,
                onClick: () => {
                  deleteCompany({ id: company._id });
                },
              }}
            />
            <Button
              icon="pencil"
              size="xs"
              variant="secondary"
              url={routes.account.companies.one.index.replace(
                ':slug',
                company.slug
              )}
              attributes={{ title: t('common:actions.edit') }}
            />
          </div>
        ),
      },
    }));
  }, [companies, t, deleteCompany, isDeleteCompanyLoading]);

  return <Table columns={columns} rows={rows} />;
};
