import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { AMENITIES } from 'config';
import { CheckboxGroupInput, Pill } from 'ui';
import { useQueryNavigation } from 'tools/hooks';
import { useToursFilters } from 'domain/tours';

import { Values } from './amenities.types';

export const FilterAmenities: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const filters = useToursFilters();

  const values = useMemo<Values>(
    () => ({ amenities: filters.amenities ?? [] }),
    [filters.amenities]
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
              items={AMENITIES.variants.map((variant) => ({
                label: t(`amenities:variants.${variant}`),
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
          as: 'button',
          label: t('common:actions.clear'),
          variant: 'secondary',
          onClick: () => {
            navigateWithQuery({ amenities: [] });
          },
          disabled: isEmpty,
          closable: true,
        },
        {
          as: 'button',
          label: t('common:actions.apply'),
          variant: 'primary',
          onClick: () => {
            navigateWithQuery({ amenities: getValues().amenities });
          },
          disabled: !isDirty,
          closable: true,
        },
      ]}
    />
  );
};
