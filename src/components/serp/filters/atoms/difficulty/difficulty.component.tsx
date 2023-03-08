import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useToursFilters, useToursFiltersSummary } from 'domain/tours';
import { Pill, SliderInput } from 'ui';
import { useQueryNavigation } from 'tools/hooks';

import { Values } from './difficulty.types';

export const FilterDifficulty: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const filters = useToursFilters();
  const { data: filtersSummary } = useToursFiltersSummary();

  const values = useMemo<Values>(
    () => ({
      difficulty: [filters.difficultyFrom ?? NaN, filters.difficultyTo ?? NaN],
    }),
    [filters.difficultyFrom, filters.difficultyTo]
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
          as: 'button',
          label: t('common:actions.clear'),
          variant: 'secondary',
          onClick: () => {
            navigateWithQuery({ difficultyFrom: NaN, difficultyTo: NaN });
          },
          disabled: isEmpty,
          closable: true,
        },
        {
          as: 'button',
          label: t('common:actions.apply'),
          variant: 'primary',
          onClick: () => {
            const [from, to] = getValues().difficulty;
            navigateWithQuery({ difficultyFrom: from, difficultyTo: to });
          },
          disabled: !isDirty,
          closable: true,
        },
      ]}
    />
  );
};
