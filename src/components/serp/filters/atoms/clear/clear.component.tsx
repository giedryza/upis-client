import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui';

export const FiltersClear: FC = () => {
  const { t } = useTranslation();

  return (
    <Button
      as="link"
      label={t('serp:actions.clear-filters')}
      size="xs"
      variant="ghost"
      href={{ query: {} }}
      shallow
    />
  );
};
