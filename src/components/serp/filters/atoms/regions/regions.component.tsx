import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { TOURS } from 'config';
import { useQueryNavigation } from 'tools/hooks';
import { useToursFilters } from 'domain/tours';
import { CheckboxGroupInput, Pill } from 'ui';

import { Values } from './regions.types';

export const FilterRegions: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const filters = useToursFilters();

  const values = useMemo<Values>(
    () => ({ regions: filters.regions ?? [] }),
    [filters.regions]
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
              items={TOURS.regions.map((region) => ({
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
          as: 'button',
          label: t('common:actions.clear'),
          variant: 'secondary',
          onClick: () => {
            navigateWithQuery({ regions: [] });
          },
          disabled: isEmpty,
          closable: true,
        },
        {
          as: 'button',
          label: t('common:actions.apply'),
          variant: 'primary',
          onClick: () => {
            navigateWithQuery({ regions: getValues().regions });
          },
          disabled: !isDirty,
          closable: true,
        },
      ]}
    />
  );
};
