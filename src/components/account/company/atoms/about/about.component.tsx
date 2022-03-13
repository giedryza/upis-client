import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { IconName } from 'ui';
import { InfoBlock, InfoItem } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies/companies.queries';

export const About: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useActiveCompany();

  return (
    <InfoBlock
      title={t('account:companies.about.title')}
      icon={IconName.Info}
      columns={1}
    >
      <InfoItem
        label={t('account:companies.about.form.name.label')}
        value={company?.name}
      />
      <InfoItem
        label={t('account:companies.about.form.description.label')}
        value={company?.description}
      />
    </InfoBlock>
  );
};
