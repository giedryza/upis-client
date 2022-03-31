import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { getRouteParam } from 'tools/common';
import { InfoBlock, InfoItem } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies';
import { routes } from 'config/routes';

export const About: VFC = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const slug = getRouteParam(query.slug);

  const { data: company } = useActiveCompany();

  return (
    <InfoBlock
      title={t('account:companies.about.title')}
      icon="info"
      columns={1}
      editPage={routes.account.companies.one.about.replace(':slug', slug)}
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
