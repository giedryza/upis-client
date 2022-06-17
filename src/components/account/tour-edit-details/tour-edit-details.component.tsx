import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, SliderInput, TextInput } from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useUpdateTour } from 'domain/tours';

import { Values } from './tour-edit-details.types';
import { INITIAL_VALUES } from './tour-edit-details.constants';
import styles from './tour-edit-details.module.scss';

export const TourEditDetails: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: tour } = useActiveTour();
  const { mutate: updateTour, isLoading } = useUpdateTour();

  useEffect(() => {
    reset({
      distance: tour?.distance ?? NaN,
      duration: tour?.duration ?? NaN,
      days: tour?.days ?? 1,
      difficulty: tour?.difficulty ?? NaN,
    });
  }, [reset, tour]);

  const onSubmit: SubmitHandler<Values> = ({
    distance,
    duration,
    days,
    difficulty,
  }) => {
    const tourId = tour?._id;

    if (!tourId) return;

    updateTour(
      { id: tourId, form: { distance, duration, days, difficulty } },
      {
        onSuccess: () => {
          push(routes.account.tours.one.index.replace(':id', tour?._id ?? ''));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:tours.details.title')}
      icon="timer"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <TextInput
              {...register('distance', {
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: t('account:tours.details.form.distance.error.min'),
                },
              })}
              label={t('account:tours.details.form.distance.label')}
              error={errors.distance?.message}
              type="number"
            />

            <TextInput
              {...register('duration', {
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: t('account:tours.details.form.duration.error.min'),
                },
              })}
              label={t('account:tours.details.form.duration.label')}
              error={errors.duration?.message}
              type="number"
            />

            <TextInput
              {...register('days', {
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: t('account:tours.details.form.days.error.min'),
                },
              })}
              label={t('account:tours.details.form.days.label')}
              error={errors.days?.message}
              type="number"
            />

            <Controller
              control={control}
              name="difficulty"
              render={({ field: { onChange, value, ref } }) => (
                <SliderInput
                  label={t('account:tours.details.form.difficulty.label')}
                  value={value}
                  onChange={onChange}
                  ref={ref}
                  min={0}
                  max={5}
                  step={0.5}
                />
              )}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.tours.one.index.replace(
                ':id',
                tour?._id ?? ''
              )}
            />

            <Button
              label={t('common:actions.save')}
              variant="tertiary"
              size="sm"
              attributes={{
                type: 'submit',
                disabled: !isDirty || isLoading,
              }}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};
