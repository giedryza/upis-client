import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { InfoBlock, MapItem } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies';
import { FieldDisplay } from 'ui';

export const Location: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useActiveCompany();

  if (!company) return null;

  return (
    <InfoBlock
      title={t('account:companies.location.title')}
      icon="pin"
      columns={1}
      actions={[
        {
          url: routes.account.companies.one.location.replace(
            ':id',
            company._id
          ),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <FieldDisplay
        label={t('account:companies.location.form.address.label')}
        value={company.address}
      />

      <MapItem
        lat={company.location.coordinates[1]}
        lng={company.location.coordinates[0]}
      />
    </InfoBlock>
  );
};
