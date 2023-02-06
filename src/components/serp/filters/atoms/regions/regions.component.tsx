import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useQueryNavigation } from 'tools/hooks';
import { regions, useToursActiveFilters } from 'domain/tours';
import { CheckboxGroupInput, Pill } from 'ui';

import { Values } from './regions.types';

export const FilterRegions: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const { data: filters } = useToursActiveFilters();

  const values = useMemo<Values>(
    () => ({ regions: filters?.regions ?? [] }),
    [filters?.regions]
  );
  const isEmpty = !values.regions.length;

  const {
    control,
    getValues,
    formState: { isDirty },
  } = useForm<Values>({ values, shouldUnregister: true });

  return (
    <Pill
      label={t('serp:filters.regions.title')}
      title={t('serp:filters.regions.title')}
      active={!isEmpty}
      popover={
        <Controller
          control={control}
          name="regions"
          render={({ field: { onChange, value } }) => (
            <CheckboxGroupInput
              ariaLabel={t('serp:filters.regions.title')}
              items={regions.map((region) => ({
                label: t(`regions:${region}`),
                value: region,
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
              navigateWithQuery({ regions: [] });
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
              navigateWithQuery({ regions: getValues().regions });
            },
            disabled: !isDirty,
          },
          closable: true,
        },
      ]}
    />
  );
};
