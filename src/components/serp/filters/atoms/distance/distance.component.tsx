import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useToursActiveFilters, useToursFiltersSummary } from 'domain/tours';
import { Pill, SliderInput } from 'ui';
import { useQueryNavigation } from 'tools/hooks';

import { Values } from './distance.types';

export const FilterDistance: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

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
            navigateWithQuery({ distanceFrom: NaN, distanceTo: NaN });
          },
          disabled: isEmpty,
          closable: true,
        },
        {
          as: 'button',
          label: t('common:actions.apply'),
          variant: 'primary',
          onClick: () => {
            const [from, to] = getValues().distance;
            navigateWithQuery({ distanceFrom: from, distanceTo: to });
          },
          disabled: !isDirty,
          closable: true,
        },
      ]}
    />
  );
};
