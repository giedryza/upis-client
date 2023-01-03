import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { CheckboxGroupInput, Pill } from 'ui';
import { useToursFilters } from 'domain/tours';
import { amenities, Variant as Amenity } from 'domain/amenities';

import { Values } from './amenities.types';

export const FilterAmenities: FC = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const { data: filters } = useToursFilters();

  const values = useMemo<Values>(
    () => ({ amenities: filters?.amenities ?? [] }),
    [filters?.amenities]
  );
  const isEmpty = !values.amenities.length;

  const navigateWithFilters = (value: Amenity[]) => {
    push({ query: { ...query, amenities: value } }, undefined, {
      shallow: true,
    });
  };

  const {
    control,
    getValues,
    formState: { isDirty },
  } = useForm<Values>({ values, shouldUnregister: true });

  return (
    <Pill
      label={t('serp:filters.amenities.title')}
      title={t('serp:filters.amenities.title')}
      active={!isEmpty}
      popover={
        <Controller
          control={control}
          name="amenities"
          render={({ field: { onChange, value } }) => (
            <CheckboxGroupInput
              ariaLabel={t('serp:filters.amenities.title')}
              items={amenities.map((variant) => ({
                label: t(`common:amenities.variants.${variant}`),
                value: variant,
              }))}
              value={value}
              onChange={onChange}
            />
          )}
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
            disabled: isEmpty,
          },
          closable: true,
        },
        {
          label: t('common:actions.apply'),
          variant: 'primary',
          attributes: {
            onClick: () => {
              navigateWithFilters(getValues().amenities);
            },
            disabled: !isDirty,
          },
          closable: true,
        },
      ]}
    />
  );
};
