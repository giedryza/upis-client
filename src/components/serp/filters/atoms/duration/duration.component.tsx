import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useToursActiveFilters, useToursFiltersSummary } from 'domain/tours';
import { Pill, SliderInput } from 'ui';
import { useQueryNavigation } from 'tools/hooks';

import { Values } from './duration.types';

export const FilterDuration: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const { data: activeFilters } = useToursActiveFilters();
  const { data: filtersSummary } = useToursFiltersSummary();

  const values = useMemo<Values>(
    () => ({
      duration: [
        activeFilters?.durationFrom ?? NaN,
        activeFilters?.durationTo ?? NaN,
      ],
    }),
    [activeFilters?.durationFrom, activeFilters?.durationTo]
  );
  const isEmpty = Boolean(values.duration.filter(Number.isNaN).length);

  const {
    control,
    getValues,
    formState: { isDirty },
  } = useForm<Values>({ values, shouldUnregister: true });

  return (
    <Pill
      label={t('serp:filters.duration.title')}
      title={t('serp:filters.duration.title')}
      active={!isEmpty}
      popover={
        <div style={{ minWidth: 300 }}>
          <Controller
            control={control}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <SliderInput
                ariaLabel={t('serp:filters.duration.title')}
                min={filtersSummary?.duration.min}
                max={filtersSummary?.duration.max}
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
              navigateWithQuery({ durationFrom: NaN, durationTo: NaN });
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
              const [from, to] = getValues().duration;
              navigateWithQuery({ durationFrom: from, durationTo: to });
            },
            disabled: !isDirty,
          },
          closable: true,
        },
      ]}
    />
  );
};
