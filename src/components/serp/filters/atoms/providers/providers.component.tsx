import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useQueryNavigation } from 'tools/hooks';
import { useToursFilters } from 'domain/tours';
import { CheckboxGroupInput, Pill } from 'ui';
import { useProviders } from 'domain/providers';

import { Values } from './providers.types';

export const FilterProviders: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const filters = useToursFilters();
  const { data: providers, isLoading } = useProviders({
    filters: { select: ['_id', 'name'], limit: 200 },
  });

  const values = useMemo<Values>(
    () => ({ providers: filters.providers ?? [] }),
    [filters.providers]
  );
  const isEmpty = !values.providers.length;

  const {
    control,
    getValues,
    formState: { isDirty },
  } = useForm<Values>({ values, shouldUnregister: true });

  return (
    <Pill
      label={t('serp:filters.providers.title')}
      title={t('serp:filters.providers.title')}
      active={!isEmpty}
      disabled={isLoading}
      popover={
        <Controller
          control={control}
          name="providers"
          render={({ field: { onChange, value } }) => (
            <CheckboxGroupInput
              ariaLabel={t('serp:filters.providers.title')}
              items={
                providers?.items.map((provider) => ({
                  label: provider.name,
                  value: provider._id,
                })) ?? []
              }
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
            navigateWithQuery({ providers: [] });
          },
          disabled: isEmpty,
          closable: true,
        },
        {
          as: 'button',
          label: t('common:actions.apply'),
          variant: 'primary',
          onClick: () => {
            navigateWithQuery({ providers: getValues().providers });
          },
          disabled: !isDirty,
          closable: true,
        },
      ]}
    />
  );
};
