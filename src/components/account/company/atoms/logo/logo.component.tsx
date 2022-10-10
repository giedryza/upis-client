import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { ImageItem, InfoBlock } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies';
import { routes } from 'config/routes';

export const Logo: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useActiveCompany();

  if (!company) return null;

  return (
    <InfoBlock
      title={t('account:companies.logo.title')}
      icon="picture"
      columns={1}
      actions={[
        {
          url: routes.account.companies.one.logo.replace(':id', company._id),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <ImageItem src={company.logo.location} />
    </InfoBlock>
  );
};
