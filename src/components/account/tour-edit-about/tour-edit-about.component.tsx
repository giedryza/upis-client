import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Container, TextInput } from 'ui';
import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { InfoBlock } from 'components/account/atoms';
import { useActiveTour, useUpdateTour } from 'domain/tours';

import { Values } from './tour-edit-about.types';
import { INITIAL_VALUES } from './tour-edit-about.constants';
import styles from './tour-edit-about.module.scss';

export const TourEditAbout: FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const { data: tour } = useActiveTour();
  const { mutate: updateTour, isLoading } = useUpdateTour();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
    values: tour
      ? {
          name: tour.name,
          description: tour.description,
          website: tour.website,
        }
      : undefined,
  });

  if (!tour) return null;

  const onSubmit: SubmitHandler<Values> = ({ name, description, website }) => {
    updateTour(
      {
        id: tour._id,
        form: { name, description, website: website || undefined },
      },
      {
        onSuccess: () => {
          push(generateUrl(routes.account.tours.one.index, { id: tour._id }));
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
              label={t('account:tours.about.form.website.label')}
              placeholder="https://upis.lt/zeimenos-upe"
              error={errors.website?.message}
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
              disabled={!isDirty || isLoading}
            />
          </div>
        </form>
      </Container>
    </InfoBlock>
  );
};
