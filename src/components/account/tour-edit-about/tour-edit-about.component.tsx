import { useEffect, FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, TextInput } from 'ui';
import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useUpdateTour } from 'domain/tours';

import { Values } from './tour-edit-about.types';
import { INITIAL_VALUES } from './tour-edit-about.constants';
import styles from './tour-edit-about.module.scss';

export const TourEditAbout: FC = () => {
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
  const { mutate: updateTour, isLoading } = useUpdateTour();

  useEffect(() => {
    reset({
      name: tour?.name,
      description: tour?.description,
      website: tour?.website,
    });
  }, [reset, tour]);

  const onSubmit: SubmitHandler<Values> = ({ name, description, website }) => {
    const tourId = tour?._id;

    if (!tourId) return;

    updateTour(
      { id: tourId, form: { name, description, website } },
      {
        onSuccess: () => {
          push(routes.account.tours.one.index.replace(':id', tourId));
        },
      }
    );
  };

  return (
    <InfoBlock title={t('account:tours.about.title')} icon="info" columns={1}>
      <Container align="left" size="sm">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <TextInput
              {...register('name', {
                required: {
                  value: true,
                  message: t('account:tours.about.form.name.error.empty'),
                },
              })}
              label={t('account:tours.about.form.name.label')}
              error={errors.name?.message}
            />

            <TextInput
              {...register('description')}
              label={t('account:tours.about.form.description.label')}
              type="textarea"
              rows={8}
              error={errors.description?.message}
            />

            <TextInput
              {...register('website')}
              label={t('account:tours.about.form.name.label')}
              placeholder="https://upis.lt/zeimenos-upe"
              error={errors.website?.message}
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
