import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { useToursFilters, useToursFiltersSummary } from 'domain/tours';
import { Pill, SliderInput } from 'ui';
import { useQueryNavigation } from 'tools/hooks';

import { Values } from './duration.types';
import styles from './duration.module.scss';

export const FilterDuration: FC = () => {
  const { t } = useTranslation();
  const { navigateWithQuery } = useQueryNavigation();

  const filters = useToursFilters();
  const { data: filtersSummary } = useToursFiltersSummary();

  const values = useMemo<Values>(
    () => ({
      duration: [filters.durationFrom ?? NaN, filters.durationTo ?? NaN],
    }),
    [filters.durationFrom, filters.durationTo]
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
      title={`${t('serp:filters.duration.title')} *`}
      active={!isEmpty}
      popover={
        <div className={styles.container}>
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
                  unit: 'hour',
                }}
                variant="primary"
              />
            )}
          />
          <p className={styles.info}>* {t('serp:filters.duration.info')}</p>
        </div>
      }
      actions={[
        {
          as: 'button',
          label: t('common:actions.clear'),
          variant: 'secondary',
          onClick: () => {
            navigateWithQuery({ durationFrom: NaN, durationTo: NaN });
          },
          disabled: isEmpty,
          closable: true,
        },
        {
          as: 'button',
          label: t('common:actions.apply'),
          variant: 'primary',
          onClick: () => {
            const [from, to] = getValues().duration;
            navigateWithQuery({
              durationFrom: from,
              durationTo: to,
              ...((filters.daysFrom || filters.daysTo) && {
                daysFrom: 1,
                daysTo: 1,
              }),
            });
          },
          disabled: !isDirty,
          closable: true,
        },
      ]}
    />
  );
};
