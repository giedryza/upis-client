import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button } from 'ui';
import { generateRoute } from 'tools/common';

export const ProvidersActions: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button
        label={t('account:providers.actions.add')}
        variant="tertiary"
        icon="plus"
        size="xs"
        url={generateRoute(routes.account.providers.create)}
      />
    </div>
  );
};
