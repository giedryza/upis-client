import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui';
import { useModalContext } from 'domain/modal';
import { FiltersModal } from 'components/modals';
import { useQueryNavigation } from 'tools/hooks';

export const FiltersModalTrigger: FC = () => {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  const { navigateWithQuery } = useQueryNavigation();

  return (
    <Button
      as="button"
      label={t('serp:filters.title')}
      variant="secondary"
      size="xs"
      icon="filters"
      onClick={async () => {
        const response = await openModal({
          component: FiltersModal,
        });

        if (response.action === 'APPLY') {
          navigateWithQuery(response.payload);
        }
      }}
    />
  );
};
