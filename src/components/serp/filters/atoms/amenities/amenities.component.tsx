import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { CheckboxGroupInput, Pill } from 'ui';
import { useToursFilters } from 'domain/tours';
import { amenities, Variant as Amenity } from 'domain/amenities';

export const FilterAmenities: FC = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const { data: filters } = useToursFilters();

  const navigateWithFilters = (value: Amenity[]) => {
    push({ query: { ...query, amenities: value } }, undefined, {
      shallow: true,
    });
  };

  return (
    <Pill
      label={t('serp:filters.amenities.title')}
      title={t('serp:filters.amenities.title')}
      active={Boolean(filters?.amenities?.length)}
      popover={
        <CheckboxGroupInput
          ariaLabel={t('serp:filters.amenities.title')}
          items={amenities.map((variant) => ({
            label: t(`common:amenities.variants.${variant}`),
            value: variant,
          }))}
          value={filters?.amenities ?? []}
          onChange={(value) => {
            navigateWithFilters(value as Amenity[]);
          }}
        />
      }
      actions={[
        {
          label: t('common:actions.clear'),
          variant: 'secondary',
          attributes: {
            onClick: () => {
              navigateWithFilters([]);
            },
          },
          closable: true,
        },
      ]}
    />
  );
};
