import { FC } from 'react';

import { Button } from 'ui';
import { useModalContext } from 'domain/modal';
import { FiltersModal } from 'components/modals';
import { useQueryNavigation } from 'tools/hooks';

export const FiltersModalTrigger: FC = () => {
  const { openModal } = useModalContext();
  const { navigateWithQuery } = useQueryNavigation();

  return (
    <Button
      variant="secondary"
      size="xs"
      label="Filters"
      attributes={{
        onClick: async () => {
          const response = await openModal({
            component: FiltersModal,
          });

          if (response.action === 'APPLY') {
            navigateWithQuery(response.payload);
          }
        },
      }}
    />
  );
};
