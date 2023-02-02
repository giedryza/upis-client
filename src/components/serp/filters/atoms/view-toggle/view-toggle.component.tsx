import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { ButtonGroup } from 'ui';

export const ViewToggle: FC = () => {
  const { t } = useTranslation();

  return (
    <ButtonGroup
      ariaLabel={t('serp:filters.viewToggle.title')}
      items={[
        { label: t('serp:filters.viewToggle.items.list'), value: 'list' },
        { label: t('serp:filters.viewToggle.items.map'), value: 'map' },
      ]}
    />
  );
};
