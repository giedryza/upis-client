import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { CheckboxGroupInput, Pill } from 'ui';
import { useQueryNavigation } from 'tools/hooks';
import { useToursActiveFilters } from 'domain/tours';
import { amenities } from 'domain/amenities';

import { Values } from './amenities.types';

export const FilterAmenities: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const { data: filters } = useToursActiveFilters();

  const values = useMemo<Values>(
    () => ({ amenities: filters?.amenities ?? [] }),
    [filters?.amenities]
  );
  const isEmpty = !values.amenities.length;

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
              variant="primary"
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
              navigateWithQuery({ amenities: [] });
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
              navigateWithQuery({ amenities: getValues().amenities });
            },
            disabled: !isDirty,
          },
          closable: true,
        },
      ]}
    />
  );
};
