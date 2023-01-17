import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui';

export const FiltersClear: FC = () => {
  const { t } = useTranslation();

  return (
    <Button
      label={t('serp:actions.clear-filters')}
      size="xs"
      variant="ghost"
      url={{
        href: { query: {} },
        shallow: true,
      }}
    />
  );
};
