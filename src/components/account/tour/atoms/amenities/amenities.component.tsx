import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveTour } from 'domain/tours';
import { routes } from 'config/routes';
import { EmptyState, Tile } from 'ui';
import { ICON_BY_VARIANT } from 'domain/amenities';
import { formatCurrency } from 'tools/format';

export const Amenities: VFC = () => {
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
          url: routes.account.tours.one.amenities.replace(':id', tour._id),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      {tour.amenities.length ? (
        tour.amenities.map((amenity) => (
          <Tile
            title={t(`common:amenities.variants.${amenity.variant}`)}
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
                    )} ${t(`common:amenities.units.${amenity.unit}`)}`
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
