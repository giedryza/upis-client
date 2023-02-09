import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button } from 'ui';
import { generateUrl } from 'tools/common';

export const ToursHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button
        label={t('account:tours.actions.add')}
        variant="tertiary"
        icon="plus"
        size="xs"
        url={generateUrl(routes.account.tours.create)}
      />
    </div>
  );
};
