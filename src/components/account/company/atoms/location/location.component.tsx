import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { routes } from 'config/routes';
import { getRouteParam } from 'tools/common';
import { InfoBlock, InfoItem, MapItem } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies';

export const Location: VFC = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const slug = getRouteParam(query.slug);
  const { data: company } = useActiveCompany();

  return (
    <InfoBlock
      title={t('account:companies.location.title')}
      icon="pin"
      columns={1}
      editPage={routes.account.companies.one.location.replace(':slug', slug)}
    >
      <InfoItem
        label={t('account:companies.location.form.address.label')}
        value={company?.address}
      />

      <MapItem
        lat={company?.location.coordinates[1]}
        lng={company?.location.coordinates[0]}
      />
    </InfoBlock>
  );
};
