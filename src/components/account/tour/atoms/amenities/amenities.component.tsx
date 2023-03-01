import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config';
import { EmptyState, Tile } from 'ui';
import { ICON_BY_VARIANT } from 'domain/amenities';
import { formatCurrency } from 'tools/format';
import { generateUrl } from 'tools/common';

export const Amenities: FC = () => {
  const { t, lang } = useTranslation();

  const { data: tour } = useActiveTour();

  if (!tour) return null;

  return (
    <InfoBlock
      title={t('account:tours.amenities.title')}
      icon="link"
      columns={tour.amenities.length ? 2 : 1}
      actions={[
        {
          as: 'link',
          href: generateUrl(routes.account.tours.one.amenities, {
            id: tour._id,
          }),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      {tour.amenities.length ? (
        tour.amenities.map(({ _id: amenity }) => (
          <Tile
            title={t(`amenities:variants.${amenity.variant}`)}
            subtitle={amenity.info}
            icon={ICON_BY_VARIANT[amenity.variant]}
            fields={[
              {
                label: t('account:providers.amenities.form.amount.display'),
                sublabel: amenity.price
                  ? `${formatCurrency(
                      lang,
                      amenity.price.amount,
                      amenity.price.currency
                    )} ${t(`amenities:units.${amenity.unit}`)}`
                  : t('common:texts.free'),
              },
            ]}
            key={amenity._id}
          />
        ))
      ) : (
        <EmptyState
          title={t('account:tours.amenities.texts.empty.title')}
          message={t('account:tours.amenities.texts.empty.message')}
        />
      )}
    </InfoBlock>
  );
};
