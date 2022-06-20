import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies';
import { routes } from 'config/routes';
import { FieldDisplay } from 'ui';

export const About: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useActiveCompany();

  if (!company) return null;

  return (
    <InfoBlock
      title={t('account:companies.about.title')}
      icon="info"
      columns={1}
      editPage={routes.account.companies.one.about.replace(':id', company._id)}
    >
      <FieldDisplay
        label={t('account:companies.about.form.name.label')}
        value={company.name}
      />
      <FieldDisplay
        label={t('account:companies.about.form.description.label')}
        value={company.description}
      />
    </InfoBlock>
  );
};
