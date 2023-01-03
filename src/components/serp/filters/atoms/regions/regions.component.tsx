import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { Region, regions, useToursFilters } from 'domain/tours';
import { CheckboxGroupInput, Pill } from 'ui';

import { Values } from './regions.types';

export const FilterRegions: FC = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const { data: filters } = useToursFilters();

  const values = useMemo<Values>(
    () => ({ regions: filters?.regions ?? [] }),
    [filters?.regions]
  );
  const isEmpty = !values.regions.length;

  const navigateWithFilters = (value: Region[]) => {
    push({ query: { ...query, regions: value } }, undefined, {
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
              navigateWithFilters(getValues().regions);
            },
            disabled: !isDirty,
          },
          closable: true,
        },
      ]}
    />
  );
};
