import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { IconName } from 'ui';
import { InfoBlock, InfoItem } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies/companies.queries';

export const Contacts: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useActiveCompany();

  return (
    <InfoBlock
      title={t('account:companies.contacts.title')}
      icon={IconName.Phone}
    >
      <InfoItem
        label={t('account:companies.contacts.form.email.label')}
        value={company?.email}
      />
      <InfoItem
        label={t('account:companies.contacts.form.phone.label')}
        value={company?.phone}
      />
      <InfoItem
        label={t('account:companies.contacts.form.website.label')}
        value={company?.website}
      />
    </InfoBlock>
  );
};
