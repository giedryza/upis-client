import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useQueryNavigation } from 'tools/hooks';
import { rivers, useToursActiveFilters } from 'domain/tours';
import { MultiAutocompleteInput, Pill } from 'ui';

import { Values } from './rivers.types';

export const FilterRivers: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const { data: filters } = useToursActiveFilters();

  const values = useMemo<Values>(
    () => ({ rivers: filters?.rivers ?? [] }),
    [filters?.rivers]
  );
  const isEmpty = !values.rivers.length;

  const {
    control,
    getValues,
    formState: { isDirty },
  } = useForm<Values>({ values, shouldUnregister: true });

  return (
    <Pill
      label={t('serp:filters.rivers.title')}
      title={t('serp:filters.rivers.title')}
      active={!isEmpty}
      popover={
        <Controller
          control={control}
          name="rivers"
          render={({ field: { onChange, value } }) => (
            <MultiAutocompleteInput
              name="rivers"
              ariaLabel={t('serp:filters.rivers.title')}
              placeholder={t('common:actions.search')}
              items={
                rivers.map((river) => ({
                  label: t(`rivers:${river}`),
                  value: river,
                })) ?? []
              }
              value={value}
              onChange={onChange}
              autofocus
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
              navigateWithQuery({ rivers: [] });
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
              navigateWithQuery({ rivers: getValues().rivers });
            },
            disabled: !isDirty,
          },
          closable: true,
        },
      ]}
    />
  );
};
