import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { IconName } from 'ui';
import { getRouteParam } from 'tools/common';
import { ImageItem, InfoBlock } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies/companies.queries';
import { routes } from 'config/routes';

export const Logo: VFC = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const slug = getRouteParam(query.slug);

  const { data: company } = useActiveCompany();

  return (
    <InfoBlock
      title={t('account:companies.logo.title')}
      icon={IconName.Picture}
      columns={1}
      editPage={routes.account.companies.one.logo.replace(':slug', slug)}
    >
      <ImageItem src={company?.logo.location} />
    </InfoBlock>
  );
};
