import { useMemo, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button, Table, TableProps } from 'ui';
import { useMyCompanies, useDeleteCompany } from 'domain/companies';
import { useConfirm } from 'domain/confirm';

import { TableColumns } from './table.types';
import styles from './table.module.scss';

export const CompaniesTable: VFC = () => {
  const { t } = useTranslation();

  const { confirmation } = useConfirm();

  const { data: companies = [] } = useMyCompanies();
  const { mutate: deleteCompany, isLoading: isDeleteCompanyLoading } =
    useDeleteCompany();

  const columns = useMemo<TableProps<TableColumns>['columns']>(() => {
    return [
      { accessor: 'name', label: t('account:companies.table.name') },
      { accessor: 'email', label: t('account:companies.table.email') },
      { accessor: 'phone', label: t('account:companies.table.phone') },
      { accessor: 'website', label: t('account:companies.table.website') },
      { accessor: 'actions', label: '', align: 'right' },
    ];
  }, [t]);

  const rows = useMemo<TableProps<TableColumns>['rows']>(() => {
    return companies.map((company) => ({
      id: company._id,
      content: {
        name: (
          <Button
            label={company.name}
            variant="link"
            size="sm"
            textAlign="left"
            url={routes.account.companies.one.index.replace(':id', company._id)}
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
                onClick: async () => {
                  const { confirmed } = await confirmation(
                    t('account:companies.texts.confirmDelete', {
                      name: company.name,
                    })
                  );

                  if (confirmed) {
                    deleteCompany({ id: company._id });
                  }
                },
              }}
            />
            <Button
              icon="pencil"
              size="xs"
              variant="secondary"
              url={routes.account.companies.one.index.replace(
                ':id',
                company._id
              )}
              attributes={{ title: t('common:actions.edit') }}
            />
          </div>
        ),
      },
    }));
  }, [companies, t, deleteCompany, isDeleteCompanyLoading, confirmation]);

  return <Table columns={columns} rows={rows} />;
};
