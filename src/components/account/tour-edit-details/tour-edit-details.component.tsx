import { FC, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, NumberInput, SliderInput } from 'ui';
import { routes } from 'config';
import { generateUrl } from 'tools/common';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useUpdateTour } from 'domain/tours';
import { useFormatNumber } from 'tools/format';

import { Values } from './tour-edit-details.types';
import { INITIAL_VALUES } from './tour-edit-details.constants';
import styles from './tour-edit-details.module.scss';

export const TourEditDetails: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { formatter: numberFormatter } = useFormatNumber();

  const { data: tour } = useActiveTour();
  const { mutate: updateTour, isLoading } = useUpdateTour();

  const {
    watch,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  useEffect(() => {
    reset({
      distance: tour?.distance ?? NaN,
      duration: tour?.duration ?? NaN,
      days: tour?.days ?? 1,
      difficulty: tour?.difficulty ?? NaN,
    });
  }, [reset, tour]);

  const [days] = watch(['days']);

  const onSubmit: SubmitHandler<Values> = (form) => {
    const tourId = tour?._id;

    if (!tourId) return;

    updateTour(
      { id: tourId, form },
      {
        onSuccess: () => {
          push(generateUrl(routes.account.tours.one.index, { id: tourId }));
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
            <div className={styles.duration}>
              <Controller
                control={control}
                name="days"
                rules={{
                  min: {
                    value: 1,
                    message: t('account:tours.details.form.days.error.min'),
                  },
                }}
                render={({ field: { name, onChange, value, ref } }) => (
                  <NumberInput
                    label={t('account:tours.details.form.days.label')}
                    textAlign="center"
                    name={name}
                    value={value}
                    placeholder="1"
                    onChange={(v) => {
                      onChange(v);
                      setValue('duration', NaN);
                    }}
                    min={1}
                    step={1}
                    stepper
                    error={errors.days?.message}
                    ref={ref}
                  />
                )}
              />
            </div>

            <Controller
              control={control}
              name="duration"
              rules={{
                min: {
                  value: 0.5,
                  message: t('account:tours.details.form.duration.error.min'),
                },
              }}
              render={({ field: { name, onChange, value, ref } }) => (
                <NumberInput
                  label={t('account:tours.details.form.duration.label')}
                  info={t('account:tours.details.form.duration.info')}
                  disabled={days > 1}
                  name={name}
                  value={value}
                  placeholder={numberFormatter.format(4.5)}
                  onChange={onChange}
                  min={0.5}
                  step={0.5}
                  error={errors.duration?.message}
                  ref={ref}
                />
              )}
            />

            <Controller
              control={control}
              name="distance"
              rules={{
                min: {
                  value: 0.01,
                  message: t('account:tours.details.form.distance.error.min'),
                },
              }}
              render={({ field: { name, onChange, value, ref } }) => (
                <NumberInput
                  label={t('account:tours.details.form.distance.label')}
                  name={name}
                  value={value}
                  placeholder={numberFormatter.format(6.5)}
                  onChange={onChange}
                  min={0.01}
                  step={0.01}
                  error={errors.distance?.message}
                  ref={ref}
                />
              )}
            />

            <Controller
              control={control}
              name="difficulty"
              render={({ field: { onChange, value, ref } }) => (
                <SliderInput
                  label={t('account:tours.details.form.difficulty.label')}
                  value={[value, NaN]}
                  onChange={([v]) => onChange(v)}
                  ref={ref}
                  thumbs={1}
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
              url={generateUrl(routes.account.tours.one.index, {
                id: tour?._id ?? '',
              })}
            />

            <Button
              label={t('common:actions.save')}
              variant="tertiary"
              size="sm"
              attributes={{
                type: 'submit',
                disabled: isLoading,
              }}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};
