import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useToursActiveFilters, useToursFiltersSummary } from 'domain/tours';
import { Pill, SliderInput } from 'ui';
import { useQueryNavigation } from 'tools/hooks';

import { Values } from './difficulty.types';

export const FilterDifficulty: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const { data: activeFilters } = useToursActiveFilters();
  const { data: filtersSummary } = useToursFiltersSummary();

  const values = useMemo<Values>(
    () => ({
      difficulty: [
        activeFilters?.difficultyFrom ?? NaN,
        activeFilters?.difficultyTo ?? NaN,
      ],
    }),
    [activeFilters?.difficultyFrom, activeFilters?.difficultyTo]
  );
  const isEmpty = Boolean(values.difficulty.filter(Number.isNaN).length);

  const {
    control,
    getValues,
    formState: { isDirty },
  } = useForm<Values>({ values, shouldUnregister: true });

  return (
    <Pill
      label={t('serp:filters.difficulty.title')}
      title={t('serp:filters.difficulty.title')}
      active={!isEmpty}
      popover={
        <Controller
          control={control}
          name="difficulty"
          render={({ field: { onChange, value } }) => (
            <SliderInput
              ariaLabel={t('serp:filters.difficulty.title')}
              min={filtersSummary?.difficulty.min}
              max={filtersSummary?.difficulty.max}
              step={0.5}
              thumbs={2}
              value={value}
              onChange={onChange}
              variant="primary"
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
              navigateWithQuery({ difficultyFrom: NaN, difficultyTo: NaN });
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
              const [from, to] = getValues().difficulty;
              navigateWithQuery({ difficultyFrom: from, difficultyTo: to });
            },
            disabled: !isDirty,
          },
          closable: true,
        },
      ]}
    />
  );
};
