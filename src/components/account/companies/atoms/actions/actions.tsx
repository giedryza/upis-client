import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button } from 'ui';

export const Actions: VFC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button
        label={t('account:companies.actions.add')}
        icon="plus"
        size="xs"
        url={routes.account.companies.create}
      />
    </div>
  );
};
