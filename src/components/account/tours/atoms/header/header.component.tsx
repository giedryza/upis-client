import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { Button } from 'ui';

export const ToursHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button
        as="link"
        label={t('account:tours.actions.add')}
        variant="tertiary"
        icon="plus"
        size="xs"
        href={generateUrl(routes.account.tours.create)}
      />
    </div>
  );
};
