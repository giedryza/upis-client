import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Tile } from 'ui';
import { useMyCompanies, useDeleteCompany } from 'domain/companies';
import { useConfirm } from 'domain/confirm';

export const CompaniesList: VFC = () => {
  const { t } = useTranslation();

  const { confirmation } = useConfirm();

  const { data: companies = [] } = useMyCompanies();
  const { mutate: deleteCompany, isLoading: isDeleteCompanyLoading } =
    useDeleteCompany();

  return (
    <>
      {companies.map((company) => (
        <Tile
          title={company.name}
          subtitle={company.address}
          fields={[
            {
              label: t('account:companies.table.email'),
              sublabel: company.email ? (
                <a
                  href={`mailto:${company.email}`}
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {company.email}
                </a>
              ) : (
                '-'
              ),
            },
            {
              label: t('account:companies.table.phone'),
              sublabel: company.phone || '-',
            },
            {
              label: t('account:companies.table.website'),
              sublabel: company.website ? (
                <a
                  href={company.website}
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {company.website}
                </a>
              ) : (
                '-'
              ),
            },
          ]}
          actions={[
            {
              label: t('common:actions.edit'),
              icon: 'pencil',
              variant: 'secondary',
              url: routes.account.companies.one.index.replace(
                ':id',
                company._id
              ),
            },
            {
              label: t('common:actions.delete'),
              icon: 'trash',
              variant: 'ghost',
              attributes: {
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
              },
            },
          ]}
          key={company._id}
        />
      ))}
    </>
  );
};
