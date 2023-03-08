import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useQueryNavigation } from 'tools/hooks';
import { rivers, useToursFilters } from 'domain/tours';
import { MultiAutocompleteInput, Pill } from 'ui';

import { Values } from './rivers.types';

export const FilterRivers: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const filters = useToursFilters();

  const values = useMemo<Values>(
    () => ({ rivers: filters.rivers ?? [] }),
    [filters.rivers]
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
          render={({ field: { onChange, value, name } }) => (
            <MultiAutocompleteInput
              name={name}
              ariaLabel={t('serp:filters.rivers.title')}
              placeholder={t('common:actions.search')}
              items={rivers.map((river) => ({
                label: t(`rivers:${river}`),
                value: river,
              }))}
              value={value}
              onChange={onChange}
              autofocus
              expanded
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
            navigateWithQuery({ rivers: [] });
          },
          disabled: isEmpty,
          closable: true,
        },
        {
          as: 'button',
          label: t('common:actions.apply'),
          variant: 'primary',
          onClick: () => {
            navigateWithQuery({ rivers: getValues().rivers });
          },
          disabled: !isDirty,
          closable: true,
        },
      ]}
    />
  );
};
