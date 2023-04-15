import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  Container,
  CheckboxGroupInput,
  MultiAutocompleteInput,
} from 'ui';
import { routes, TOURS } from 'config';
import { generateUrl } from 'tools/services';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useUpdateTourGeography } from 'domain/tours';

import { Values } from './tour-edit-geography.types';
import { INITIAL_VALUES } from './tour-edit-geography.constants';
import styles from './tour-edit-geography.module.scss';

export const TourEditGeography: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { data: tour } = useActiveTour();
  const { mutate: updateTourGeography, isLoading } = useUpdateTourGeography();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    values: tour
      ? {
          regions: tour.regions,
          rivers: tour.rivers,
        }
      : undefined,
  });

  if (!tour) return null;

  const onSubmit: SubmitHandler<Values> = (form) => {
    updateTourGeography(
      {
        id: tour._id,
        form,
      },
      {
        onSuccess: () => {
          push(generateUrl(routes.account.tours.one.index, { id: tour._id }));
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
                    TOURS.regions.map((region) => ({
                      label: t(`regions:${region}`),
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

            <Controller
              control={control}
              name="rivers"
              render={({ field: { name, onChange, value, ref } }) => (
                <MultiAutocompleteInput
                  name={name}
                  label={t('account:tours.geography.form.rivers.label')}
                  placeholder={t(
                    'account:tours.geography.form.rivers.placeholder'
                  )}
                  items={
                    TOURS.rivers.map((river) => ({
                      label: t(`rivers:${river}`),
                      value: river,
                    })) ?? []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.rivers?.message}
                  ref={ref}
                />
              )}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              as="link"
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              href={generateUrl(routes.account.tours.one.index, {
                id: tour._id,
              })}
            />

            <Button
              as="button"
              label={t('common:actions.save')}
              variant="tertiary"
              size="sm"
              type="submit"
              disabled={isLoading}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};
