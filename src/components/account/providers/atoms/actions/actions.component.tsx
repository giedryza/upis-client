import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button } from 'ui';

export const ProvidersActions: VFC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button
        label={t('account:providers.actions.add')}
        variant="tertiary"
        icon="plus"
        size="xs"
        url={routes.account.providers.create}
      />
    </div>
  );
};
