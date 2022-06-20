import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies';
import { FieldDisplay } from 'ui';

export const Contacts: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useActiveCompany();

  if (!company) return null;

  return (
    <InfoBlock
      title={t('account:companies.contacts.title')}
      icon="phone"
      editPage={routes.account.companies.one.contacts.replace(
        ':id',
        company._id
      )}
    >
      <FieldDisplay
        label={t('account:companies.contacts.form.email.label')}
        value={company.email}
      />
      <FieldDisplay
        label={t('account:companies.contacts.form.phone.label')}
        value={company.phone}
      />
      <FieldDisplay
        label={t('account:companies.contacts.form.website.label')}
        value={company.website}
      />
    </InfoBlock>
  );
};
