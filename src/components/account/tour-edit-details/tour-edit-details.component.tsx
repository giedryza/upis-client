import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, TextInput } from 'ui';
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
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: tour } = useActiveTour();
  const { mutate: updateTour, isLoading } = useUpdateTour({
    onSuccess: () => {
      push(routes.account.tours.one.index.replace(':id', tour?._id ?? ''));
    },
  });

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

    updateTour({ id: tourId, form: { distance, duration, days, difficulty } });
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

            <TextInput
              {...register('difficulty', {
                valueAsNumber: true,
              })}
              label={t('account:tours.details.form.difficulty.label')}
              error={errors.difficulty?.message}
              type="number"
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
