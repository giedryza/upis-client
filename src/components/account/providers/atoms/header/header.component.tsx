import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { Button } from 'ui';
import { generateUrl } from 'tools/services';

export const ProvidersHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button
        as="link"
        label={t('account:providers.actions.add')}
        variant="tertiary"
        icon="plus"
        size="xs"
        href={generateUrl(routes.account.providers.create)}
      />
    </div>
  );
};
