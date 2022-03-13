import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { IconName } from 'ui';
import { InfoBlock, InfoItem, MapItem } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies/companies.queries';

export const Location: VFC = () => {
  const { t } = useTranslation();

  const { data: company } = useActiveCompany();

  return (
    <InfoBlock
      title={t('account:companies.location.title')}
      icon={IconName.Pin}
      columns={1}
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
