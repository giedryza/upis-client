import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button } from 'ui';
import { useConfirm } from 'domain/confirm';
import { useActiveCompany, useDeleteCompany } from 'domain/companies';
import { InfoBlock } from 'components/account/atoms';

export const Settings: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { confirmation } = useConfirm();

  const { data: company } = useActiveCompany();
  const { mutate: deleteCompany, isLoading: isDeleteCompanyLoading } =
    useDeleteCompany();

  if (!company) return null;

  return (
    <InfoBlock
      title={t('account:companies.settings.title')}
      columns={1}
      icon="gear"
    >
      <div>
        <Button
          label={t('account:companies.actions.delete')}
          variant="ghost"
          icon="trash"
          size="sm"
          attributes={{
            disabled: isDeleteCompanyLoading,
            onClick: async () => {
              const { confirmed } = await confirmation(
                t('account:companies.texts.confirmDelete', {
                  name: company.name,
                })
              );

              if (confirmed) {
                deleteCompany(
                  { id: company._id },
                  {
                    onSuccess: () => {
                      push(routes.account.companies.index);
                    },
                  }
                );
              }
            },
          }}
        />
      </div>
    </InfoBlock>
  );
};
