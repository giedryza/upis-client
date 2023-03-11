import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { AMENITIES, TOURS } from 'config';
import {
  CheckboxGroupInput,
  Modal,
  MultiAutocompleteInput,
  SliderInput,
} from 'ui';
import { useToursFilters, useToursFiltersSummary } from 'domain/tours';
import { useProviders } from 'domain/providers';

import { Props, Values } from './filters-modal.types';
import { INITIAL_VALUES, FORM_ID } from './filters-modal.constants';
import styles from './filters-modal.module.scss';

export const FiltersModal: FC<Props> = ({ closeModal }) => {
  const { t } = useTranslation();

  const filters = useToursFilters();
  const { data: filtersSummary } = useToursFiltersSummary();
  const { data: providers, isLoading: isProvidersLoading } = useProviders({
    filters: { select: ['_id', 'name'], limit: 200 },
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  useEffect(() => {
    reset({
      amenities: filters.amenities ?? [],
      regions: filters.regions ?? [],
      rivers: filters.rivers ?? [],
      days: [filters.daysFrom ?? NaN, filters.daysTo ?? NaN],
      duration: [filters.durationFrom ?? NaN, filters.durationTo ?? NaN],
      distance: [filters.distanceFrom ?? NaN, filters.distanceTo ?? NaN],
      difficulty: [filters.difficultyFrom ?? NaN, filters.difficultyTo ?? NaN],
      providers: filters.providers ?? [],
    });
  }, [filters, reset]);

  const onSubmit: SubmitHandler<Values> = (values) => {
    closeModal({
      action: 'APPLY',
      payload: {
        amenities: values.amenities,
        regions: values.regions,
        rivers: values.rivers,
        daysFrom: values.days[0],
        daysTo: values.days[1],
        durationFrom: values.duration[0],
        durationTo: values.duration[1],
        distanceFrom: values.distance[0],
        distanceTo: values.distance[1],
        difficultyFrom: values.difficulty[0],
        difficultyTo: values.difficulty[1],
        providers: values.providers,
      },
    });
  };

  return (
    <Modal.Content
      title={t('serp:filters.title')}
      actions={[
        {
          as: 'button',
          label: t('common:actions.cancel'),
          variant: 'ghost',
          onClick: () => closeModal({ action: 'CLOSE' }),
        },
        {
          as: 'button',
          label: t('common:actions.apply'),
          variant: 'primary',
          type: 'submit',
          form: FORM_ID,
          disabled: !isDirty,
        },
      ]}
    >
      <form
        id={FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
          control={control}
          name="amenities"
          render={({ field: { onChange, value } }) => (
            <CheckboxGroupInput
              label={t('serp:filters.amenities.title')}
              items={AMENITIES.variants.map((variant) => ({
                label: t(`amenities:variants.${variant}`),
                value: variant,
              }))}
              value={value}
              onChange={onChange}
              variant="primary"
            />
          )}
        />

        <Controller
          control={control}
          name="regions"
          render={({ field: { onChange, value } }) => (
            <CheckboxGroupInput
              label={t('serp:filters.regions.title')}
              items={TOURS.regions.map((region) => ({
                label: t(`regions:${region}`),
                value: region,
              }))}
              value={value}
              onChange={onChange}
              variant="primary"
            />
          )}
        />

        <Controller
          control={control}
          name="rivers"
          render={({ field: { onChange, value, name } }) => (
            <MultiAutocompleteInput
              name={name}
              label={t('serp:filters.rivers.title')}
              placeholder={t('common:actions.search')}
              items={TOURS.rivers.map((river) => ({
                label: t(`rivers:${river}`),
                value: river,
              }))}
              value={value}
              onChange={onChange}
              variant="primary"
              expanded
            />
          )}
        />

        <Controller
          control={control}
          name="days"
          render={({ field: { onChange, value } }) => (
            <SliderInput
              label={t('serp:filters.days.title')}
              min={filtersSummary?.days.min}
              max={filtersSummary?.days.max}
              thumbs={2}
              value={value}
              onChange={(v) => {
                onChange(v);
                setValue('duration', [NaN, NaN]);
              }}
              formatOptions={{
                style: 'unit',
                unit: 'day',
              }}
              variant="primary"
            />
          )}
        />

        <Controller
          control={control}
          name="duration"
          render={({ field: { onChange, value } }) => (
            <SliderInput
              label={t('serp:filters.duration.title')}
              min={filtersSummary?.duration.min}
              max={filtersSummary?.duration.max}
              thumbs={2}
              value={value}
              onChange={(v) => {
                onChange(v);
                setValue('days', [NaN, NaN]);
              }}
              formatOptions={{
                style: 'unit',
                unit: 'hour',
              }}
              variant="primary"
            />
          )}
        />

        <Controller
          control={control}
          name="distance"
          render={({ field: { onChange, value } }) => (
            <SliderInput
              label={t('serp:filters.distance.title')}
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

        <Controller
          control={control}
          name="difficulty"
          render={({ field: { onChange, value } }) => (
            <SliderInput
              label={t('serp:filters.difficulty.title')}
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

        <Controller
          control={control}
          name="providers"
          render={({ field: { onChange, value } }) => (
            <CheckboxGroupInput
              label={t('serp:filters.providers.title')}
              items={
                providers?.items.map((provider) => ({
                  label: provider.name,
                  value: provider._id,
                })) ?? []
              }
              value={value}
              onChange={onChange}
              disabled={isProvidersLoading}
              variant="primary"
            />
          )}
        />
      </form>
    </Modal.Content>
  );
};
