import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { generateUrl } from 'tools/common';
import { Button } from 'ui';

export const AddTour: FC = () => {
  const { t } = useTranslation();

  return (
    <Button
      label={t('common:header.addTour')}
      variant="outline"
      size="xs"
      url={generateUrl(routes.account.tours.create)}
    />
  );
};
