import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { routes } from 'config/routes';
import { getRouteParam } from 'tools/common';
import { InfoBlock, InfoItem } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies';

export const Contacts: VFC = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const slug = getRouteParam(query.slug);
  const { data: company } = useActiveCompany();

  return (
    <InfoBlock
      title={t('account:companies.contacts.title')}
      icon="phone"
      editPage={routes.account.companies.one.contacts.replace(':slug', slug)}
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
