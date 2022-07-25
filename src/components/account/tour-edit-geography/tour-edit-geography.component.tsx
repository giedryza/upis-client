import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, CheckboxGroupInput } from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { regions, useActiveTour, useUpdateTourGeography } from 'domain/tours';

import { Values } from './tour-edit-geography.types';
import { INITIAL_VALUES } from './tour-edit-geography.constants';
import styles from './tour-edit-geography.module.scss';

export const TourEditGeography: VFC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: tour } = useActiveTour();
  const { mutate: updateTourGeography, isLoading } = useUpdateTourGeography();

  useEffect(() => {
    reset({
      regions: tour?.regions ?? [],
      rivers: tour?.rivers ?? [],
    });
  }, [reset, tour]);

  const onSubmit: SubmitHandler<Values> = (form) => {
    const tourId = tour?._id;

    if (!tourId) return;

    updateTourGeography(
      {
        id: tourId,
        form,
      },
      {
        onSuccess: () => {
          push(routes.account.tours.one.index.replace(':id', tourId));
        },
      }
    );
  };

  return (
    <InfoBlock
      title={t('account:tours.geography.title')}
      icon="globe"
      columns={1}
    >
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <Controller
              control={control}
              name="regions"
              render={({ field: { onChange, value, ref } }) => (
                <CheckboxGroupInput
                  label={t('account:tours.geography.form.regions.label')}
                  items={
                    regions.map((region) => ({
                      label: t(
                        `account:tours.geography.form.regions.values.${region}`
                      ),
                      value: region,
                    })) ?? []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.regions?.message}
                  ref={ref}
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
                disabled: isLoading,
              }}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};
