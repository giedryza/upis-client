import { useMemo, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button, IconName, Table, TableProps } from 'ui';
import { useMyCompanies } from 'domain/companies/companies.queries';

import { CompaniesTableColumns } from './companies-table.types';
import styles from './companies-table.module.scss';

export const CompaniesTable: VFC = () => {
  const { t } = useTranslation();

  const { data: companies = [] } = useMyCompanies();

  const columns = useMemo<TableProps<CompaniesTableColumns>['columns']>(() => {
    return [
      { accessor: 'name', label: t('account:companies.table.name') },
      { accessor: 'email', label: t('account:companies.table.email') },
      { accessor: 'phone', label: t('account:companies.table.phone') },
      { accessor: 'website', label: t('account:companies.table.website') },
      { accessor: 'actions', label: '', align: 'left' },
    ];
  }, [t]);

  const rows = useMemo<TableProps<CompaniesTableColumns>['rows']>(() => {
    return companies.map((company) => ({
      id: company._id,
      content: {
        name: <Button label={company.name} variant="link" size="sm" />,
        email: company.email,
        phone: company.phone,
        website: company.website,
        actions: (
          <div className={styles.actions}>
            <Button
              icon={IconName.Trash}
              size="xs"
              variant="secondary"
              attributes={{ title: t('common:actions.delete') }}
            />
            <Button
              icon={IconName.Pencil}
              size="xs"
              variant="secondary"
              attributes={{ title: t('common:actions.edit') }}
            />
          </div>
        ),
      },
    }));
  }, [companies, t]);

  return <Table columns={columns} rows={rows} />;
};
