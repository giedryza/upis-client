import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useToursActiveFilters, useToursFiltersSummary } from 'domain/tours';
import { Pill, SliderInput } from 'ui';
import { useQueryNavigation } from 'tools/hooks';

import { Values } from './days.types';

export const FilterDays: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const { data: activeFilters } = useToursActiveFilters();
  const { data: filtersSummary } = useToursFiltersSummary();

  const values = useMemo<Values>(
    () => ({
      days: [activeFilters?.daysFrom ?? NaN, activeFilters?.daysTo ?? NaN],
    }),
    [activeFilters?.daysFrom, activeFilters?.daysTo]
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
        <div style={{ minWidth: 300 }}>
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
              />
            )}
          />
        </div>
      }
      actions={[
        {
          label: t('common:actions.clear'),
          variant: 'secondary',
          attributes: {
            onClick: () => {
              navigateWithQuery({ daysFrom: NaN, daysTo: NaN });
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
              const [from, to] = getValues().days;
              navigateWithQuery({ daysFrom: from, daysTo: to });
            },
            disabled: !isDirty,
          },
          closable: true,
        },
      ]}
    />
  );
};
