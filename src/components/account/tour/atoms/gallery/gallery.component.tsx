import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { useActiveTour } from 'domain/tours';
import { InfoBlock } from 'components/account/atoms';

export const Gallery: FC = () => {
  const { t } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.gallery.title')}
      columns={1}
      icon="picture"
    >
      {null}
    </InfoBlock>
  );
};
