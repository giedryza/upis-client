import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useToursActiveFilters, useToursFiltersSummary } from 'domain/tours';
import { Pill, SliderInput } from 'ui';

import { Values } from './distance.types';

export const FilterDistance: FC = () => {
  const { t } = useTranslation();
  const { push, query } = useRouter();

  const { data: activeFilters } = useToursActiveFilters();
  const { data: filtersSummary } = useToursFiltersSummary();

  const values = useMemo<Values>(
    () => ({
      distance: [
        activeFilters?.distanceFrom ?? NaN,
        activeFilters?.distanceTo ?? NaN,
      ],
    }),
    [activeFilters?.distanceFrom, activeFilters?.distanceTo]
  );
  const isEmpty = Boolean(values.distance.filter(Number.isNaN).length);

  const navigateWithFilters = ([from, to]: [number, number]) => {
    push(
      {
        query: {
          ...query,
          distanceFrom: Number.isNaN(from) ? [] : from,
          distanceTo: Number.isNaN(to) ? [] : to,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const {
    control,
    getValues,
    formState: { isDirty },
  } = useForm<Values>({ values, shouldUnregister: true });

  return (
    <Pill
      label={t('serp:filters.distance.title')}
      title={t('serp:filters.distance.title')}
      active={!isEmpty}
      popover={
        <div style={{ minWidth: 300 }}>
          <Controller
            control={control}
            name="distance"
            render={({ field: { onChange, value } }) => (
              <SliderInput
                ariaLabel={t('serp:filters.distance.title')}
                min={filtersSummary?.distance.min}
                max={filtersSummary?.distance.max}
                thumbs={2}
                value={value}
                onChange={onChange}
                formatOptions={{
                  style: 'unit',
                  unit: 'kilometer',
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
              navigateWithFilters([NaN, NaN]);
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
              navigateWithFilters(getValues().distance);
            },
            disabled: !isDirty,
          },
          closable: true,
        },
      ]}
    />
  );
};
