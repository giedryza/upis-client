import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { generateUrl } from 'tools/services/url';
import { Button } from 'ui';

export const AddTour: FC = () => {
  const { t } = useTranslation();

  return (
    <Button
      as="link"
      label={t('common:header.add_tour')}
      variant="outline"
      size="xs"
      href={generateUrl(routes.account.tours.create)}
    />
  );
};
