import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useToursFilters, useToursFiltersSummary } from 'domain/tours';
import { Pill, SliderInput } from 'ui';
import { useQueryNavigation } from 'tools/hooks';

import { Values } from './days.types';

export const FilterDays: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const filters = useToursFilters();
  const { data: filtersSummary } = useToursFiltersSummary();

  const values = useMemo<Values>(
    () => ({
      days: [filters.daysFrom ?? NaN, filters.daysTo ?? NaN],
    }),
    [filters.daysFrom, filters.daysTo]
  );
  const isEmpty = Boolean(values.days.filter(Number.isNaN).length);

  const {
    control,
    getValues,
    formState: { isDirty },
  } = useForm<Values>({ values, shouldUnregister: true });

  return (
    <Pill
      label={t('serp:filters.days.title')}
      title={t('serp:filters.days.title')}
      active={!isEmpty}
      popover={
        <Controller
          control={control}
          name="days"
          render={({ field: { onChange, value } }) => (
            <SliderInput
              ariaLabel={t('serp:filters.days.title')}
              min={filtersSummary?.days.min}
              max={filtersSummary?.days.max}
              thumbs={2}
              value={value}
              onChange={onChange}
              formatOptions={{
                style: 'unit',
                unit: 'day',
              }}
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
            navigateWithQuery({ daysFrom: NaN, daysTo: NaN });
          },
          disabled: isEmpty,
          closable: true,
        },
        {
          as: 'button',
          label: t('common:actions.apply'),
          variant: 'primary',
          onClick: () => {
            const [from, to] = getValues().days;
            navigateWithQuery({
              daysFrom: from,
              daysTo: to,
              ...(from > 1 && { durationFrom: NaN, durationTo: NaN }),
            });
          },
          disabled: !isDirty,
          closable: true,
        },
      ]}
    />
  );
};
